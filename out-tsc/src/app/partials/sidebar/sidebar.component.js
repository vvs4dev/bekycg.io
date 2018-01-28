"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_config_provider_1 = require("./../../app-config.provider");
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(appConfig) {
        this.appConfig = appConfig;
        this.sideMenu = {};
        this.sideMenu = this.appConfig.sideMenu;
    }
    SidebarComponent.prototype.ngOnInit = function () {
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
    ]; };
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map