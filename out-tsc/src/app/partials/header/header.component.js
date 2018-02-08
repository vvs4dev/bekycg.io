"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_config_provider_1 = require("./../../app-config.provider");
var user_service_1 = require("../../_services/user.service");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(appConfig, userService) {
        this.appConfig = appConfig;
        this.userService = userService;
        this.me = {};
        this.me = this.userService.getActiveUser().me;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-header',
                    templateUrl: './header.component.html',
                    styleUrls: ['./header.component.scss']
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: app_config_provider_1.AppConfigProvider, },
        { type: user_service_1.UserService, },
    ]; };
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map