"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var user_service_1 = require("./user.service");
var alert_service_1 = require("./alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("../app-config.provider");
var AuthService = /** @class */ (function () {
    function AuthService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.loginURL = appConfig.apiEndpoint + '/auth/login';
        this.logoutURL = appConfig.apiEndpoint + '/auth/logout';
        console.log('this.loginURL', this.loginURL);
        console.log('this.logoutURL', this.logoutURL);
    }
    AuthService.prototype.login = function (user, pass) {
        console.log('login', user, pass);
        return this.http.post(this.loginURL, {
            username: user,
            password: pass
        });
    };
    AuthService.prototype.logout = function (userId) {
        var _this = this;
        console.log('logout');
        localStorage.removeItem('userConfig');
        this.http.post(this.logoutURL, null)
            .subscribe(function (res) {
            _this.alert.success('User Successfully LoggedOut');
            _this.unsetMe();
        }, function (err) {
            if (err.error instanceof Error) {
                _this.alert.error('Client - Side Error Occured');
            }
            else {
                _this.alert.error('Server - Side Error Occured');
            }
        });
    };
    AuthService.prototype.setMe = function (url) {
        var _this = this;
        this.http.get(this.appConfig.apiEndpoint + '/users/me')
            .subscribe(function (res) {
            console.log('this.user.me', res);
            localStorage.setItem('me', JSON.stringify(res));
            _this.router.navigate([url]);
        }, function (err) {
            console.log('this.user.me', err);
        });
    };
    AuthService.prototype.unsetMe = function () {
        console.log('unsetMe');
        localStorage.removeItem('me');
    };
    AuthService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map