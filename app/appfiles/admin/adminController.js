authApp.controller('AdminController', ['$scope', 'AdminService', 'LoginService', function ($scope, AdminService, LoginService) {
    
    $scope.users = [];
    $scope.isAuthenticated = LoginService.isAuthenticated();

    AdminService.getAdminData(function (users) {
        $scope.users = users;
    }, function (error, status) {
        $scope.errorStatus = status + " " + error.error;
        $scope.errorMessage = error.description;
    });

}]);