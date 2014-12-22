authApp.directive("authToolbar", ['LoginService', function (LoginService) {
    return {
        templateUrl: '/common/toolbar/toolbar.tpl.html',
        restrict: 'E',
        link: function ($scope, $element, $attrs, $controller) {

            $scope.authenticated = LoginService.isAuthenticated();
            $scope.currentUser = LoginService.currentUser;
            $scope.login = LoginService.showLogin;
            $scope.logout = LoginService.logout;

            //Watcher for currentuser
            $scope.$watch(function () {
                return LoginService.currentUser;
            }, function () {
                $scope.currentUser = LoginService.currentUser;
                $scope.authenticated = LoginService.isAuthenticated();
            });

        }
    }
}]);