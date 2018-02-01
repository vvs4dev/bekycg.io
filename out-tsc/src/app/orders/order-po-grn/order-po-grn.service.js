"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderPoGrnService = /** @class */ (function () {
    function OrderPoGrnService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderPoGrnReq = {};
        this.orderPoGrnReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'POFilter': '&filter[fields][id]=true&filter[fields][vendorCode]=true&filter[fields][vendorName]=true',
        };
        // console.log('this.orderPoGrnReq', this.orderPoGrnReq);
    }
    OrderPoGrnService.prototype.getPurchaseOrders = function (id, status) {
        return this.http.get(this.orderPoGrnReq.baseURL + '/Orders/' + id + '/orderPurchaseOrders' + this.orderPoGrnReq.authReq + '&filter={ "where": { "status": "' + status + '" } }');
    };
    OrderPoGrnService.prototype.validatePoGRNNumber = function (GRNNumber) {
        return this.http.get(this.orderPoGrnReq.baseURL + '/orderGoodsReceiptNotes/count' + this.orderPoGrnReq.authReq + '&where={ "GRNNumber": "' + GRNNumber + '" }');
    };
    OrderPoGrnService.prototype.postGRN = function (id, grn) {
        return this.http.post(this.orderPoGrnReq.baseURL + '/Orders/' + id + '/orderGoodsReceiptNotes' + this.orderPoGrnReq.authReq, grn);
    };
    OrderPoGrnService.prototype.patchPOStatus = function (poId, status) {
        // console.log('updatePOStatus',poId, status);
        return this.http.patch(this.orderPoGrnReq.baseURL + '/OrderPurchaseOrders/' + poId + this.orderPoGrnReq.authReq, { "status": status });
    };
    OrderPoGrnService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderPoGrnService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderPoGrnService;
}());
exports.OrderPoGrnService = OrderPoGrnService;
//# sourceMappingURL=order-po-grn.service.js.map