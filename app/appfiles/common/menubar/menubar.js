authApp.directive("authMenubar", ['MenuService', 'LoginService', '$filter', function (MenuService, LoginService, $filter) {
    return {
        templateUrl: '/common/menubar/menubar.tpl.html',
        restrict: 'E',
        link: function ($scope, $element, $attrs, $controller) {

            $scope.menus = [];
            var successCb = function (menus) {
                $scope.menus = menus;
            };

            //Watcher for currentuser
            $scope.$watch(function () {
                return LoginService.currentUser;
            }, function () {
                MenuService.getMenu(successCb);
            });
        }
    }
}]);