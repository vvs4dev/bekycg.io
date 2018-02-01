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
    }
    // =============================================  Order ===========================================
    // =============================================  Order ===========================================
    OrderService.prototype.formatDate = 
    // =============================================  Order ===========================================
    function (dateString) {
        this.dateToFormat = new Date(dateString);
        var month = this.dateToFormat.getMonth() + 1;
        var date = this.dateToFormat.getDate();
        month = (month < 10) ? ('0' + month) : month;
        date = (date < 10) ? ('0' + date) : date;
        return this.dateToFormat.getFullYear() + '-' + month + '-' + date;
    };
    OrderService.prototype.checkExistanceOrderNumber = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/validate/order/' + orderNumber);
    };
    OrderService.prototype.findOrder = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/order/' + orderNumber);
    };
    OrderService.prototype.setActiveOrder = function (order) {
        this.aOrder = order;
    };
    OrderService.prototype.getActiveOrder = function () {
        return this.aOrder;
    };
    OrderService.prototype.getAllOrders = function () {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/allorders');
    };
    OrderService.prototype.getOrderFabrics = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/ofabric/' + orderNumber);
    };
    OrderService.prototype.getOrderJobs = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/ojob/' + orderNumber);
    };
    OrderService.prototype.getOrderAccessories = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/oaccessory/' + orderNumber);
    };
    OrderService.prototype.getOrderPackers = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/opacker/' + orderNumber);
    };
    OrderService.prototype.getOrderPurchaseOrders = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/opo/' + orderNumber);
    };
    OrderService.prototype.getOrderGRNs = function (orderNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/get/ogrn/' + orderNumber);
    };
    // =============================================  Order Entry===========================================
    // =============================================  Order Entry===========================================
    OrderService.prototype.postOrder = 
    // =============================================  Order Entry===========================================
    function (order) {
        // console.log('PostOrder');
        return this.http.post(this.appConfig.apiEndpoint + '/order', order);
    };
    OrderService.prototype.putOrder = function (id, order) {
        // console.log('PutOrder');
        return this.http.patch(this.appConfig.apiEndpoint + '/order/' + id, order);
    };
    // =============================================  Order Fabric ===========================================
    // =============================================  Order Fabric ===========================================
    OrderService.prototype.postOrderFabric = 
    // =============================================  Order Fabric ===========================================
    function (order, orderFabric) {
        // console.log('PostOrderFabric');
        return this.http.post(this.appConfig.apiEndpoint + '/orderfabric', orderFabric);
    };
    OrderService.prototype.putOrderFabric = function (id, orderFabric) {
        // console.log('PutOrderFabric');
        return this.http.put(this.appConfig.apiEndpoint + '/orderfabric/' + id, orderFabric);
    };
    OrderService.prototype.findOrderFabric = function (id) {
        return this.http.get(this.appConfig.apiEndpoint + '/orderfabric/' + id);
    };
    // =============================================  Order Job ===========================================
    // =============================================  Order Job ===========================================
    OrderService.prototype.postOrderJob = 
    // =============================================  Order Job ===========================================
    function (orderJob) {
        // console.log('PostOrderJob');
        return this.http.post(this.appConfig.apiEndpoint + '/orderjob', orderJob);
    };
    OrderService.prototype.findOrderJob = function (id) {
        return this.http.get(this.appConfig.apiEndpoint + '/orderjob/' + id);
    };
    OrderService.prototype.putOrderJob = function (id, orderJob) {
        // console.log('PutOrderJob');
        return this.http.put(this.appConfig.apiEndpoint + '/orderjob/' + id, orderJob);
    };
    // =============================================  Order Accessories ===========================================
    // =============================================  Order Accessories ===========================================
    OrderService.prototype.postOrderAccessories = 
    // =============================================  Order Accessories ===========================================
    function (order, orderAccessories) {
        // console.log('PostOrderAccessories');
        return this.http.post(this.appConfig.apiEndpoint + '/orderaccessory', orderAccessories);
    };
    OrderService.prototype.findOrderAccessories = function (id) {
        return this.http.get(this.appConfig.apiEndpoint + '/orderaccessory/' + id);
    };
    OrderService.prototype.putOrderAccessories = function (id, orderAccessory) {
        // console.log('PutOrderAccessories');
        return this.http.put(this.appConfig.apiEndpoint + '/orderaccessory/' + id, orderAccessory);
    };
    // =============================================  Order Packers ===========================================
    // =============================================  Order Packers ===========================================
    OrderService.prototype.postOrderPackers = 
    // =============================================  Order Packers ===========================================
    function (order, orderPackers) {
        // console.log('PostOrderPackers');
        return this.http.post(this.appConfig.apiEndpoint + '/orderpacker', orderPackers);
    };
    OrderService.prototype.findOrderPackers = function (id) {
        return this.http.get(this.appConfig.apiEndpoint + '/orderpacker/' + id);
    };
    OrderService.prototype.putOrderPackers = function (id, orderPacker) {
        // console.log('PutOrderPackers');
        return this.http.put(this.appConfig.apiEndpoint + '/orderpacker/' + id, orderPacker);
    };
    // =============================================  Order PO ===========================================
    // =============================================  Order PO ===========================================
    OrderService.prototype.validatePONumber = 
    // =============================================  Order PO ===========================================
    function (PONumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/validate/po/' + PONumber);
    };
    OrderService.prototype.postPurchaseOrder = function (id, po) {
        return this.http.post(this.appConfig.apiEndpoint + '/orderpo', po);
    };
    // =============================================  Order GRN ===========================================
    // =============================================  Order GRN ===========================================
    OrderService.prototype.validateGRNNumber = 
    // =============================================  Order GRN ===========================================
    function (GRNNumber) {
        return this.http.get(this.appConfig.apiEndpoint + '/corder/validate/grn/' + GRNNumber);
    };
    OrderService.prototype.postGRN = function (id, grn) {
        return this.http.post(this.appConfig.apiEndpoint + '/ordergrn', grn);
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