"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_component_1 = require("../app.component");
var router_1 = require("@angular/router");
var user_service_1 = require("../_services/user.service");
var presets_service_1 = require("./presets.service");
var alert_service_1 = require("../_services/alert.service");
var PresetsComponent = /** @class */ (function () {
    function PresetsComponent(appComponent, alertService, userService, presetsService, router) {
        this.appComponent = appComponent;
        this.alertService = alertService;
        this.userService = userService;
        this.presetsService = presetsService;
        this.router = router;
        this.myBreadCrumb = [];
        this.master = {};
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" }
        ];
        this.appComponent.setActiveBreadcrumb('Presets', this.myBreadCrumb);
        this.master.items = [];
        this.master.res = {};
        this.master.count = [];
        this.master.items = ["buyer", "vendor", "style", "fabric", "treatment", "job", "accessory", "packer"];
    }
    PresetsComponent.prototype.ngOnInit = function () {
        this.countMasters();
    };
    PresetsComponent.prototype.countMasters = function () {
        var _this = this;
        this.master.items.forEach(function (element, index) {
            // // console.log(element, index);
            // // console.log(element, index);
            _this.presetsService.countMaster(element)
                .subscribe(function (res) {
                // // console.log('element',element, 'res', res);
                // // console.log('element',element, 'res', res);
                _this.master.res = res;
                _this.master.count.push(_this.master.res.val);
                // // console.log('masterVal', 'element', this.masterVal);
            }, function (err) {
                _this.alertService.error("Error Fetching Data");
                // // console.log('element',element, 'error', err)
            });
        });
    };
    PresetsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets',
                    templateUrl: './presets.component.html',
                    styleUrls: ['./presets.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: alert_service_1.AlertService, },
        { type: user_service_1.UserService, },
        { type: presets_service_1.PresetsService, },
        { type: router_1.Router, },
    ]; };
    return PresetsComponent;
}());
exports.PresetsComponent = PresetsComponent;
//# sourceMappingURL=presets.component.js.map