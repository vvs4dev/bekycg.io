"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderPackersService = /** @class */ (function () {
    function OrderPackersService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderPackersReq = {};
        this.orderPackersReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'orderFilter': '&filter[fields][id]=true&filter[fields][orderNumber]=true',
            'packersFilter': '&filter[fields][id]=true&filter[fields][packingMaterialName]=true&filter[fields][packingMaterialCode]=true&filter[fields][packingMaterialType]=true&filter[fields][packingMaterialDescription]=true'
        };
        console.log('this.orderPackersReq', this.orderPackersReq);
    }
    OrderPackersService.prototype.getOrdersList = function () {
        return this.http.get(this.orderPackersReq.baseURL + '/Orders' + this.orderPackersReq.authReq + this.orderPackersReq.orderFilter);
    };
    OrderPackersService.prototype.getPackersList = function () {
        return this.http.get(this.orderPackersReq.baseURL + '/MasterPackingMaterials' + this.orderPackersReq.authReq + this.orderPackersReq.packersFilter);
    };
    OrderPackersService.prototype.postOrderPackers = function (order, orderPackers) {
        return this.http.post(this.orderPackersReq.baseURL + '/Orders/' + order + '/OrderPackingMaterials' + this.orderPackersReq.authReq, orderPackers);
    };
    OrderPackersService.prototype.findOrderPackers = function (id) {
        return this.http.get(this.orderPackersReq.baseURL + '/OrderPackingMaterials/' + id + this.orderPackersReq.authReq);
    };
    OrderPackersService.prototype.patchOrderPackers = function (id, orderJobwork) {
        console.log('patchOrderJobwork');
        return this.http.patch(this.orderPackersReq.baseURL + '/OrderPackingMaterials/' + id + this.orderPackersReq.authReq, orderJobwork);
    };
    OrderPackersService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderPackersService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderPackersService;
}());
exports.OrderPackersService = OrderPackersService;
//# sourceMappingURL=order-packers.service.js.map