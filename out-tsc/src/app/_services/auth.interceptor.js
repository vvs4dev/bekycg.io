"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("./user.service");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(userService) {
        this.userService = userService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        if (localStorage.getItem('userConfig')) {
            var authReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer " + this.userService.getActiveUserSID())
            });
            return next.handle(authReq);
        }
        else {
            var authReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer")
            });
            return next.handle(req);
        }
    };
    AuthInterceptor.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AuthInterceptor.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
    ]; };
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=auth.interceptor.js.map