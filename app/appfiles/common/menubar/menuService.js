authApp.factory('MenuService',['$http', '$q', function ($http, $q) {
    "use strict";
    return {
        getMenu: function (successCb, errorCb) {
            $http.get('/menu').success(function (data, status) {
                successCb(data);
            }).error(function (error, status) {
                if (errorCb) {
                    errorCb(error);
                }
            });
        }
    };
}]);