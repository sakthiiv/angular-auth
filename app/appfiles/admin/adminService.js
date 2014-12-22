authApp.factory('AdminService', ['$http', function ($http) {
    "use strict";
    return {
        getAdminData: function (successCb, errorCb) {

            $http.get("/admin").success(function (data, status) {
                successCb(data);
            }).error(function (error, status) {
                errorCb(error, status);
            });

        }
    };

}]);