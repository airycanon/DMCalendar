'use strict';

angular.module('dmCalendar.month', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/month', {
            templateUrl: 'components/month.html',
            controller: 'monthCtrl'
        });
    }])

    .controller('monthCtrl', ['$scope',function(scope) {
        scope.month = getMonth(new Date());

        function getMonth(date){
            var month = [];
            date.setDate(1);
            console.log(date);
            for(var i = 0;i < 6;i ++)
            {
                var start = new Date(date.getTime());
                start.setDate(start.getDate() + 7 * i);
                month[i] = getWeek(start);
            }
            return month;
        }

        function getWeek(date){
            console.log("开始",date);
            var week = [];
            date.setDate(date.getDate() - date.getDay());
            var start = new Date()
            for(var i = 0;i < 7;i++){
                var tempDate = new Date(date.getTime());
                tempDate.setDate(tempDate.getDate() + i);
                console.log("星期",i,tempDate);
                week[i] = tempDate;
            }
            return week;
        }
    }]);
