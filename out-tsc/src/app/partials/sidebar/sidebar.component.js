"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_config_provider_1 = require("./../../app-config.provider");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../_services/user.service");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(appConfig, userService, router) {
        this.appConfig = appConfig;
        this.userService = userService;
        this.router = router;
        this.dropMenu = {};
        this.me = {};
        this.dropMenu = this.appConfig.dropMenu;
        this.me = this.userService.getActiveUser().me;
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent.prototype.setActiveMenu = function (menu) {
        this.activeMenu = menu;
    };
    SidebarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-sidebar',
                    templateUrl: './sidebar.component.html',
                    styleUrls: ['./sidebar.component.scss']
                },] },
    ];
    /** @nocollapse */
    SidebarComponent.ctorParameters = function () { return [
        { type: app_config_provider_1.AppConfigProvider, },
        { type: user_service_1.UserService, },
        { type: router_1.Router, },
    ]; };
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map