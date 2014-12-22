var authApp = angular.module('authApp', ['ui.bootstrap', 'ngResource', 'ngRoute']);

authApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.otherwise({
        redirectTo: "/"
    });

    //These Static Routings will be made dynamic in future development

    $routeProvider.when('/admin', {
        templateUrl: 'admin/admin.html',
        controller: 'AdminController'
    });

}]);


//Module Constants

authApp.constant('COOKIE_CONFIG', {

    COOKIE_NAME: "sessionAuth",
    EXPIRY_MINUTE: 20

}).constant('USER_CONS', {

    USER_NAME: "username",
    TOKEN: "token",
    ROLE: "role",
    PASSWORD: "password"

}).constant('USER_ROLES', {

    ADMIN: "1",
    GUEST: "0"

});