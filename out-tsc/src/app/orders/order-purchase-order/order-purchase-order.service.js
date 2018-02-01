"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderPurchaseOrderService = /** @class */ (function () {
    function OrderPurchaseOrderService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderPurchaseOrderReq = {};
        this.materialList = [];
        this.orderPurchaseOrderReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'vendorsFilter': '&filter[fields][id]=true&filter[fields][vendorCode]=true&filter[fields][vendorName]=true',
        };
        // console.log('this.orderPurchaseOrderReq', this.orderPurchaseOrderReq);
    }
    OrderPurchaseOrderService.prototype.validatePurchaseOrderNumber = function (purchaseOrderNumber) {
        return this.http.get(this.orderPurchaseOrderReq.baseURL + '/orderPurchaseOrders/count' + this.orderPurchaseOrderReq.authReq + '&where={ "purchaseOrderNumber": "' + purchaseOrderNumber + '" }');
    };
    OrderPurchaseOrderService.prototype.getVendorsList = function () {
        return this.http.get(this.orderPurchaseOrderReq.baseURL + '/Vendors' + this.orderPurchaseOrderReq.authReq + this.orderPurchaseOrderReq.vendorsFilter);
    };
    OrderPurchaseOrderService.prototype.getVendorContactList = function (vendor) {
        return this.http.get(this.orderPurchaseOrderReq.baseURL + '/Vendors/' + vendor + '/VendorContacts' + this.orderPurchaseOrderReq.authReq);
    };
    OrderPurchaseOrderService.prototype.getOrderFabrics = function (id) {
        return this.http.get(this.orderPurchaseOrderReq.baseURL + '/Orders/' + id + '/orderFabrics' + this.orderPurchaseOrderReq.authReq);
    };
    OrderPurchaseOrderService.prototype.getOrderAccessories = function (id) {
        return this.http.get(this.orderPurchaseOrderReq.baseURL + '/Orders/' + id + '/orderAccessories' + this.orderPurchaseOrderReq.authReq);
    };
    OrderPurchaseOrderService.prototype.getOrderPackers = function (id) {
        return this.http.get(this.orderPurchaseOrderReq.baseURL + '/Orders/' + id + '/orderPackingMaterials' + this.orderPurchaseOrderReq.authReq);
    };
    OrderPurchaseOrderService.prototype.postPurchaseOrder = function (id, po) {
        return this.http.post(this.orderPurchaseOrderReq.baseURL + '/Orders/' + id + '/orderPurchaseOrders' + this.orderPurchaseOrderReq.authReq, po);
    };
    OrderPurchaseOrderService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderPurchaseOrderService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderPurchaseOrderService;
}());
exports.OrderPurchaseOrderService = OrderPurchaseOrderService;
//# sourceMappingURL=order-purchase-order.service.js.map