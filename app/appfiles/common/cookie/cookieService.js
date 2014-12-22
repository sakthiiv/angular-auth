authApp.factory('cookieService', ['cookieStore', 'COOKIE_CONFIG', function (cookieStore, COOKIE_CONFIG) {

    var cookieService = {
        add: function (obj) {
            cookieStore.put(COOKIE_CONFIG.COOKIE_NAME, obj);
        },
        clear: function () {
            cookieStore.remove(COOKIE_CONFIG.COOKIE_NAME);
        },
        isLogged: function () {
            return !!cookieService.currentUserInfo('username');
        },
        currentUserInfo: function (prop) {
            var userInfo = cookieStore.get(COOKIE_CONFIG.COOKIE_NAME);
            if (userInfo && userInfo.hasOwnProperty(prop)) {
                return userInfo[prop];
            }
            return null;
        }
    };

    return cookieService;
} ]);