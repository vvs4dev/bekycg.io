"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../_services/user.service");
var alert_service_1 = require("./../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../app-config.provider");
var OrderService = /** @class */ (function () {
    function OrderService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderReq = {};
        this.orderReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'orderFilter': '&filter[fields][id]=true&filter[fields][orderNumber]=true'
        };
        console.log('this.orderReq', this.orderReq);
    }
    OrderService.prototype.formatDate = function (dateString) {
        this.dateToFormat = new Date(dateString);
        var month = this.dateToFormat.getMonth() + 1;
        var date = this.dateToFormat.getDate();
        month = (month < 10) ? ('0' + month) : month;
        date = (date < 10) ? ('0' + date) : date;
        return this.dateToFormat.getFullYear() + '-' + month + '-' + date;
    };
    OrderService.prototype.findOrderNumber = function (orderNumber) {
        return this.http.get(this.orderReq.baseURL + '/Orders/findOne' + this.orderReq.authReq + '&filter={ "where": { "orderNumber": "' + orderNumber + '" } }');
    };
    OrderService.prototype.checkExistanceOrderNumber = function (orderNumber) {
        return this.http.get(this.orderReq.baseURL + '/Orders/count' + this.orderReq.authReq + '&where={ "orderNumber": "' + orderNumber + '" }');
    };
    OrderService.prototype.findOrder = function (orderNumber) {
        return this.http.get(this.orderReq.baseURL + '/Orders/findOne' + this.orderReq.authReq + '&filter={ "where": { "orderNumber": "' + orderNumber + '" } }');
    };
    OrderService.prototype.setActiveOrder = function (order) {
        this.aOrder = order;
    };
    OrderService.prototype.getActiveOrder = function () {
        return this.aOrder;
    };
    OrderService.prototype.getAllOrders = function () {
        return this.http.get(this.orderReq.baseURL + '/Orders' + this.orderReq.authReq);
    };
    OrderService.prototype.getOrderFabrics = function (id) {
        return this.http.get(this.orderReq.baseURL + '/Orders/' + id + '/orderFabrics' + this.orderReq.authReq);
    };
    OrderService.prototype.getOrderJobworks = function (id) {
        return this.http.get(this.orderReq.baseURL + '/Orders/' + id + '/orderJobworks' + this.orderReq.authReq);
    };
    OrderService.prototype.getOrderAccessories = function (id) {
        return this.http.get(this.orderReq.baseURL + '/Orders/' + id + '/orderAccessories' + this.orderReq.authReq);
    };
    OrderService.prototype.getOrderPackers = function (id) {
        return this.http.get(this.orderReq.baseURL + '/Orders/' + id + '/orderPackingMaterials' + this.orderReq.authReq);
    };
    OrderService.prototype.getOrderPurchaseOrders = function (id) {
        return this.http.get(this.orderReq.baseURL + '/Orders/' + id + '/orderPurchaseOrders' + this.orderReq.authReq);
    };
    OrderService.prototype.getOrderGRNs = function (id) {
        return this.http.get(this.orderReq.baseURL + '/Orders/' + id + '/orderGoodsReceiptNotes' + this.orderReq.authReq);
    };
    OrderService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map