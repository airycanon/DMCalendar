'use strict';

angular.module('dmCalendar.month', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/month', {
            templateUrl: 'components/month.html',
            controller: 'monthCtrl'
        });
    }])

    .service('monthService', function () {
        var monthService = {};
        monthService.month = [[], [], [], [], [], [], []];
        monthService.weekLabels = [];

        monthService.refresh = function (date, firstDayOfWeek) {
            var weekLabels = [['日', '一', '二', '三', '四', '五', '六'], ['一', '二', '三', '四', '五', '六', '日']];
            var start = new Date(date.getTime());
            start.setDate(1);
            start.setTime(start.getTime() - 1000 * 24 * 60 * 60 * (7 - firstDayOfWeek));

            for (var i = 0; i < 42; i++) {
                var tempDate = new Date(start.getTime());
                tempDate.setDate(tempDate.getDate() + i);
                var week = parseInt(i / 7);
                var day = i % 7;
                if (week === 0) {

                    monthService.weekLabels[tempDate.getDay()] = weekLabels[firstDayOfWeek][tempDate.getDay()];
                }
                monthService.month[week][day] = tempDate;
            }
        };
        return monthService;
    })

    .controller('monthCtrl', ['$scope', "monthService", function (scope, monthService) {
        scope.firstDayOfWeek = 0;
        scope.month = monthService.month;
        scope.weekLabels = monthService.weekLabels;

        var presentDay = new Date();
        monthService.refresh(presentDay, scope.firstDayOfWeek);

        scope.firstDayChange = function () {
            monthService.refresh(presentDay, scope.firstDayOfWeek);
        }

        function getWeek(date, firstDayInWeek) {
            var week = [];
            date.setDate(date.getDate() - date.getDay() + firstDayInWeek);

            for (var i = 0; i < 7; i++) {
                var tempDate = new Date(date.getTime());
                tempDate.setDate(tempDate.getDate() + i);
                week[i] = tempDate;
            }
            return week;
        }
    }]);
