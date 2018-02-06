"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getActiveUser = function () {
        this.userConfig = JSON.parse(localStorage.getItem('userConfig'));
        this.userConfig.me = JSON.parse(localStorage.getItem('me'));
        return this.userConfig;
    };
    UserService.prototype.getActiveUserSID = function () {
        this.userConfig = JSON.parse(localStorage.getItem('userConfig'));
        return this.userConfig.id;
    };
    UserService.prototype.getActiveUserId = function () {
        this.userConfig = JSON.parse(localStorage.getItem('userConfig'));
        console.log(this.userConfig);
        return this.userConfig.uid;
    };
    UserService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    UserService.ctorParameters = function () { return []; };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map