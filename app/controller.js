'use strict';

angular.module('dmCalendar.controller', ['ui.bootstrap'])
    .controller('controller', ['$scope', 'service', function (scope, service) {
        scope.firstDayOfWeek = 0;
        scope.displayMode = "month";
        scope.month = service.month;
        scope.weekLabels = service.weekLabels;
        scope.week = service.week;

        var presentDay = new Date();
        service.refreshMonth(presentDay, scope.firstDayOfWeek);
        service.refreshWeek(presentDay, scope.firstDayOfWeek);

        scope.firstDayChange = function () {
            if(scope.displayMode === "month"){
                service.refreshMonth(presentDay, scope.firstDayOfWeek);
            } else if(scope.displayMode === "week") {
                service.refreshWeek(presentDay, scope.firstDayOfWeek)
            }
        }

        scope.checkMonth = function (date){
            var className = "";
            if(date.getYear() == presentDay.getYear() && date.getMonth() == presentDay.getMonth() && date.getDate() == presentDay.getDate()){
                className += "current-cell ";
            }
            if(date.getMonth() === presentDay.getMonth()){
                className += 'present-month-cell';
            } else if(date.getMonth() < presentDay.getMonth()){
                className +=  'previous-month-cell';
            } else {
                className += 'next-month-cell';
            }

            return className;
        }
    }]);
