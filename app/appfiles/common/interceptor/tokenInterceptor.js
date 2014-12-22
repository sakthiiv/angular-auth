authApp.factory('tokenInterceptor', ['$rootScope', '$q', 'cookieService', function ($rootScope, $q, cookieService) {

    var token = 'token';

    return {
        request: function (config) {
            if (cookieService.currentUserInfo(token)) {
                config.headers['x-auth-token'] = cookieService.currentUserInfo(token);
            }
            return config || $q.when(config);
        },
        requestError: function (request) {
            return $q.reject(request);
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (response) {
            return $q.reject(response);
        }
    };
} ]);

authApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
}]);