"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_config_provider_1 = require("./../../app-config.provider");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(appConfig) {
        this.appConfig = appConfig;
        this.sideMenu = {};
        this.sideMenu = this.appConfig.sideMenu;
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
    ]; };
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map