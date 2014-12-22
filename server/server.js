var http = require("http");
var https = require('https');
var express = require("express");
var fs = require("fs")
var app = express();
var privateKey = fs.readFileSync(__dirname + '/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString();
var credentials = { key: privateKey, cert: certificate };
var jwt = require('jwt-simple');
var server = http.createServer(app);
var secureServer = https.createServer(credentials, app);
var _us = require('underscore')._;

//Constants - Start

var CONSTANTS = {
    X_AUTH_TOKEN: 'x-auth-token',
    SERVER_RUNNING: 'Server running in port 4000.',
    SECURE_SERVER_RUNNING: 'Secure Server running in port 8000.',
    TOKEN_SECRET_LABEL: 'token-secret',
    TOKEN_SECRET: 'This is a secret string'
};

//Constants - End

app.use(express.bodyParser());
app.set(CONSTANTS.TOKEN_SECRET_LABEL, CONSTANTS.TOKEN_SECRET);

//Public directories to be exposed

app.configure(function () {
    app.use(express.static(__dirname + '/../app/libs'));
    app.use(express.static(__dirname + '/../app/appfiles'));
});

//Mapping the routes

app.all('/', function (req, res) {
    res.sendfile('index.html', { root: __dirname + '/../app/appFiles' });
});

//Login service

app.post("/authenticate", function (req, res) {
    var users = Utility.readJsonFileSync(__dirname + '/data/users.json'), user = {}, i;
    user = Authorisation.userValidation(users, req.body.username, req.body.password);
    res = Utility.setContentType(res);
    if (Utility.isNullOrEmpty(user)) {
        res.status(401).send({ error: "Unauthorized", description: "Invalid Username or Password!" });
    }
    else {
        //If authenticated, attach the token for API Access
        var token = jwt.encode({
            role: user.role
        }, app.get(CONSTANTS.TOKEN_SECRET_LABEL));
        user.token = token;
        res.send(user);
    }
});

app.get("/menu", function (req, res) {
    var menu = Utility.readJsonFileSync(__dirname + '/data/menu.json'), isAdmin = Authorisation.isAdmin(req.headers);
    res = Utility.setContentType(res);
    if (!isAdmin) {
        menu = _us.filter(menu, Authorisation.adminPredicate);
    }
    res.send(menu);
});

app.get("/admin", function (req, res) {
    var adminData = Utility.readJsonFileSync(__dirname + '/data/users.json'), isAdmin = Authorisation.isAdmin(req.headers);
    res = Utility.setContentType(res);
    if (!isAdmin) {
        res.status(401).send({ error: "Unauthorized", description: "You do not have permission." });
    }
    res.send(adminData);
});


//Utility Functions - Start

var Utility = {
    readJsonFileSync: function (filepath, encoding) {
        if (typeof (encoding) == 'undefined') {
            encoding = 'utf8';
        }
        var file = fs.readFileSync(filepath, encoding);
        return JSON.parse(file);
    },
    isEmptyObject: function (obj) {
        var obj;
        for (var key in obj) return !1;
        return !0;
    },
    setContentType: function (res) {
        if (res) {
            res.set("Content-Type", "application/json");
        }
        return res;
    },
    isNullOrEmpty: function (obj) {
        if (obj === undefined || obj === null || obj === "") {
            return true;
        }
        return false;
    }
};


var Authorisation = {
    userValidation: function (users, username, password) {
        "use strict";
        var user, i;
        user = _us.findWhere(users, { "username": username, "password": password });
        return user;
    },
    tokenVerification: function (token) {
        "use strict";
        if (token) {
            try {
                var decoded = jwt.decode(token, app.get(CONSTANTS.TOKEN_SECRET_LABEL));
                return decoded;
            } catch (err) {
                return false;
            }
        }
        return false;
    },
    isAdmin: function (headers) {
        "use strict";
        if (headers.hasOwnProperty(CONSTANTS.X_AUTH_TOKEN)) {
            var decoded = Authorisation.tokenVerification(headers[CONSTANTS.X_AUTH_TOKEN]);
            if (decoded && decoded.hasOwnProperty('role')) {
                return decoded.role === '1';
            }
        }
        return false;
    },
    adminPredicate: function (obj) {
        return !(obj.hasOwnProperty("role") && obj["role"] === "1");
    }
};

//Utility Functions - End

server.listen(4000);
secureServer.listen(8000);

console.log(CONSTANTS.SERVER_RUNNING);
console.log(CONSTANTS.SECURE_SERVER_RUNNING);
