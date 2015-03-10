'use strict';

angular.module('dmCalendar.controller', ['ui.bootstrap'])
    .controller('controller', ['$scope', 'service', function (scope, service) {
        scope.firstDayOfWeek = 0;
        scope.displayMode = "month";
        scope.month = service.month;
        scope.weekLabels = service.weekLabels;
        scope.week = service.week;
        scope.current = new Date();
        scope.present = new Date();

        service.refreshMonth(scope.present, scope.firstDayOfWeek);
        service.refreshWeek(scope.present, scope.firstDayOfWeek);

        scope.firstDayChange = function () {
            if(scope.displayMode === "month"){
                service.refreshMonth(scope.present, scope.firstDayOfWeek);
            } else if(scope.displayMode === "week") {
                service.refreshWeek(scope.present, scope.firstDayOfWeek)
            }
        }

        scope.checkMonth = function (date){
            var className = "";
            if(date.getFullYear() == scope.current.getFullYear() && date.getMonth() == scope.current.getMonth() && date.getDate() == scope.current.getDate()){
                className += "current-cell ";
            }
             else if(date.getMonth() === scope.present.getMonth()){
                className += 'present-month-cell';
            } else if(date.getMonth() < scope.present.getMonth()){
                className +=  'previous-month-cell';
            } else {
                className += 'next-month-cell';
            }
            return className;
        }

        scope.nextMonth = function (){
            var month = scope.present.getMonth();
            var year = scope.present.getFullYear();
            if(month === 11){
                scope.present.setFullYear(year + 1);
                scope.present.setMonth(0);
            } else {
                scope.present.setMonth(month + 1);
            }
            service.refreshMonth(scope.present, scope.firstDayOfWeek);
        }

        scope.nextYear = function (){
            scope.present.setFullYear(scope.present.getFullYear() + 1);
            service.refreshMonth(scope.present, scope.firstDayOfWeek);
        }

        scope.previousMonth = function(){
            var month = scope.present.getMonth();
            var year = scope.present.getFullYear();
            if(month === 0){
                scope.present.setFullYear(year - 1);
                scope.present.setMonth(11);
            } else {
                scope.present.setMonth(month - 1);
            }
            service.refreshMonth(scope.present, scope.firstDayOfWeek);
        }

        scope.previousYear = function (){
            scope.present.setFullYear(scope.present.getFullYear() - 1);
            service.refreshMonth(scope.present, scope.firstDayOfWeek);
        }
    }]);
