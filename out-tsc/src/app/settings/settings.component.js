"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_component_1 = require("../app.component");
var router_1 = require("@angular/router");
var user_service_1 = require("../_services/user.service");
var settings_service_1 = require("./settings.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(appComponent, userService, router, settingsService) {
        this.appComponent = appComponent;
        this.userService = userService;
        this.router = router;
        this.settingsService = settingsService;
        this.myBreadCrumb = {};
        this.myOrg = {};
        this.myBreadCrumb.crumbs = [
            { 'menu': 'Home', 'routerLink': '/' }
        ];
        this.myBreadCrumb.active = 'My Organisation';
        this.myOrg.org = {};
        this.myOrg.org.address = {};
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.getMyOrganisation(this.userService.getActiveUserId())
            .subscribe(function (res) {
            console.log('getMyOrganisation', res);
            _this.myOrg = res;
        }, function (err) {
            console.log('getMyOrganisation', err);
        });
    };
    SettingsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-settings',
                    templateUrl: './settings.component.html',
                    styleUrls: ['./settings.component.scss']
                },] },
    ];
    /** @nocollapse */
    SettingsComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: user_service_1.UserService, },
        { type: router_1.Router, },
        { type: settings_service_1.SettingsService, },
    ]; };
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map