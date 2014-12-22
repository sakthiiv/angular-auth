authApp.controller('LoginController', function ($scope, $modalInstance, LoginService) {

    $scope.user = {};
    $scope.authError = false;
    $scope.authErrStatus = "";
    $scope.authErrDescription = "";

    $scope.signIn = function () {
        var promise = LoginService.login($scope.user);
        promise.then(function (data) {
            resetErrorMsg(false);
            $modalInstance.dismiss("cancel");
        }, function (data) {
            resetErrorMsg(true, data.error, data.status);
        });
    };

    $scope.cancelSignIn = function () {
        LoginService.cancelLogin($modalInstance);
    };

    function resetErrorMsg(show, info, status) {
        $scope.authError = show;
        if (info && status) {
            $scope.authErrStatus = status + " " + info.error;
            $scope.authErrDescription = info.description;
        }
    }

});