"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../_services/user.service");
var dash_service_1 = require("./dash.service");
// SEO
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var DashComponent = /** @class */ (function () {
    function DashComponent(meta, title, user, dashService, router, appComponent) {
        this.user = user;
        this.dashService = dashService;
        this.router = router;
        this.appComponent = appComponent;
        this.activeUser = this.user.getActiveUser();
        // SEO Config
        title.setTitle('My Dashboard');
        meta.addTags([
            { name: 'author', content: 'BESAAS' },
            { name: 'keywords', content: 'Garments ERP Dashboard' },
            { name: 'description', content: 'View the Progress of the Company' }
        ]);
        this.appComponent.setActiveBreadcrumb('Dashboard', null);
    }
    DashComponent.prototype.ngOnInit = function () {
        this.countBuyers();
        this.countVendors();
        this.countOrders();
    };
    DashComponent.prototype.countBuyers = function () {
        var _this = this;
        this.dashService.getBuyersCount()
            .subscribe(function (res) {
            console.log('dashService.getBuyersCount', res);
            _this.buyers = res;
        }, function (err) {
            console.log('dashService.getBuyersCount', err);
        });
    };
    DashComponent.prototype.countVendors = function () {
        var _this = this;
        this.dashService.getVendorsCount()
            .subscribe(function (res) {
            console.log('dashService.getVendorsCount', res);
            _this.vendors = res;
        }, function (err) {
            console.log('dashService.getVendorsCount', err);
        });
    };
    DashComponent.prototype.countOrders = function () {
        var _this = this;
        this.dashService.getOrdersCount()
            .subscribe(function (res) {
            console.log('dashService.getOrdersCount', res);
            _this.orders = res;
        }, function (err) {
            console.log('dashService.getOrdersCount', err);
        });
    };
    DashComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dash',
                    templateUrl: './dash.component.html',
                    styleUrls: ['./dash.component.scss']
                },] },
    ];
    /** @nocollapse */
    DashComponent.ctorParameters = function () { return [
        { type: platform_browser_1.Meta, },
        { type: platform_browser_1.Title, },
        { type: user_service_1.UserService, },
        { type: dash_service_1.DashService, },
        { type: router_1.Router, },
        { type: app_component_1.AppComponent, },
    ]; };
    return DashComponent;
}());
exports.DashComponent = DashComponent;
//# sourceMappingURL=dash.component.js.map