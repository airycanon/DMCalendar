'use strict';

angular.module('dmCalendar.service', [])
    .value('config', {
        'weekLabels': [['日', '一', '二', '三', '四', '五', '六'], ['一', '二', '三', '四', '五', '六', '日']]
    })
    .service('service', function (config) {
        var service = {};
        service.month = [[], [], [], [], [], [], []];
        service.week = [];
        service.weekLabels = [];

        service.refreshMonth = function (date, firstDayOfWeek) {
            var start = new Date(date.getTime());
            start.setDate(1);
            start.setTime(start.getTime() - 1000 * 24 * 60 * 60 * (7 - firstDayOfWeek));

            for (var i = 0; i < 42; i++) {
                var tempDate = new Date(start.getTime());
                tempDate.setDate(tempDate.getDate() + i);
                var week = parseInt(i / 7);
                var day = i % 7;
                if (week === 0) {
                    service.weekLabels[tempDate.getDay()] = config.weekLabels[firstDayOfWeek][tempDate.getDay()];
                }
                service.month[week][day] = tempDate;
            }
        };

        service.refreshWeek = function getWeek(date, firstDayOfWeek) {
            var start = new Date(date.getTime());
            start.setDate(start.getDate() - start.getDay() + firstDayOfWeek);

            for (var i = 0; i < 7; i++) {
                var tempDate = new Date(start.getTime());
                tempDate.setDate(tempDate.getDate() + i);
                service.week[i] = tempDate;
                service.weekLabels[tempDate.getDay()] = config.weekLabels[firstDayOfWeek][tempDate.getDay()];
            }
        }
        return service;
    });