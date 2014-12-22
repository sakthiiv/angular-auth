authApp.factory('LoginService', ['$q', '$http', '$modal', 'cookieService', 'USER_CONS', function ($q, $http, $modal, cookieService, USER_CONS) {
    "use strict";

    var modalInstance = null;    
    function openLoginDialog() {
        modalInstance = $modal.open({
            templateUrl: 'login/login.tpl.html',
            controller: 'LoginController'
        });
    }

    var authService = {

        currentUser: cookieService.currentUserInfo(USER_CONS.USER_NAME),

        isAuthenticated: function () {
            return cookieService.isLogged();
        },

        showLogin: function () {
            openLoginDialog();
        },

        login: function (user_) {
            var defer = $q.defer(), username = USER_CONS.USER_NAME
                , token = USER_CONS.TOKEN, password = USER_CONS.PASSWORD;

            //Always use POST when sending username and password
            //GET will store the query string in history

            $http.post('/authenticate', { username: user_.username, password: user_.password })
                .success(function (data, status) {
                    defer.resolve({ "data": data, "status": status });
                    cookieService.add({ username: data.username, token: data.token });
                    //Update CurrentUser for the triggering the watches
                    authService.currentUser = cookieService.currentUserInfo(USER_CONS.USER_NAME);
                })
                .error(function (error, status) {
                    defer.reject({ "error": error, "status": status });
                    cookieService.clear();
                });
            return defer.promise;
        },

        cancelLogin: function (modalInstance_) {
            if (modalInstance_) {
                modalInstance_.dismiss('cancel');
            }
        },

        logout: function () {
            cookieService.clear();
            //Update CurrentUser for the triggering the watches
            authService.currentUser = cookieService.currentUserInfo(USER_CONS.USER_NAME);
        }

    };

    return authService;
}]);
