'use strict';

// Declare app level module which depends on views, and components
angular.module('dmCalendar', [
    'ngRoute',
    'dmCalendar.login',
    'dmCalendar.register',
    'dmCalendar.month'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/month'});
}]);
