authApp.provider('cookieStore', function CookieStoreFactory() {
    var self = this;
    self.defaultOptions = {};

    self.setDefaultOptions = function (options) {
        self.defaultOptions = options;
    };

    self.$get = function () {
        return {
            get: function (name) {
                var jsonCookie = $.cookie(name);
                if (jsonCookie) {
                    return angular.fromJson(jsonCookie);
                }
            },
            put: function (name, value, options) {
                options = $.extend({}, self.defaultOptions, options);
                $.cookie(name, angular.toJson(value), options);
            },
            remove: function (name, options) {
                options = $.extend({}, self.defaultOptions, options);
                $.removeCookie(name, options);
            }
        };
    };
});

authApp.config(["cookieStoreProvider", "COOKIE_CONFIG", function (cookieStoreProvider, COOKIE_CONFIG) {
    
    //Set the Minutes to hold the cache value
    var minutes = COOKIE_CONFIG.EXPIRY_MINUTE, expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (minutes * 60 * 1000));

    cookieStoreProvider.setDefaultOptions({
        path: '/',
        expires: expiryDate
    });
}]);