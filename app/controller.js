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
                service.refreshWeek(scope.present, scope.firstDayOfWeek);
            }
        }

        scope.checkMonth = function (date){
            var className = "";
            if(date.getFullYear() == scope.current.getFullYear() && date.getMonth() == scope.current.getMonth() &&
                date.getDate() == scope.current.getDate()){
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

        scope.changeMonth = function(incOrDec){
            var month = scope.present.getMonth();
            var year = scope.present.getFullYear();
            var offset = incOrDec ? 1:-1;
            if((incOrDec && month === 11) || (!incOrDec && month === 0)){
                scope.present.setFullYear(year + offset);
                scope.present.setMonth(11 - month);
            } else {
                scope.present.setMonth(month + offset);
            }
            service.refreshMonth(scope.present, scope.firstDayOfWeek);
        }

        scope.changeWeek = function(incOrDec){
            var offset = incOrDec ? 7:-7;
            var time = scope.present.getTime();
            scope.present.setTime(time + offset * 60 * 60 * 24 * 1000);
            service.refreshWeek(scope.present, scope.firstDayOfWeek);
        }

        scope.changeYear = function (incOrDec){
            var offset = incOrDec ? 1:-1;
            scope.present.setFullYear(scope.present.getFullYear() + offset);
            service.refreshMonth(scope.present, scope.firstDayOfWeek);
        }
    }]);
