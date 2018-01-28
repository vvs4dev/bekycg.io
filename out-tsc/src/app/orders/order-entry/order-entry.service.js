"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderEntryService = /** @class */ (function () {
    function OrderEntryService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderEntryReq = {};
        this.orderEntryReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'buyersFilter': '&filter[fields][id]=true&filter[fields][brandCode]=true&filter[fields][brandName]=true',
            'masterClothStylesFilter': '&filter[fields][id]=true&filter[fields][styleName]=true'
        };
        console.log('this.orderEntryReq', this.orderEntryReq);
    }
    OrderEntryService.prototype.getBuyersList = function () {
        return this.http.get(this.orderEntryReq.baseURL + '/Buyers' + this.orderEntryReq.authReq);
    };
    OrderEntryService.prototype.getBuyerContactList = function (buyer) {
        return this.http.get(this.orderEntryReq.baseURL + '/Buyers/' + buyer + '/BuyerContacts' + this.orderEntryReq.authReq);
    };
    OrderEntryService.prototype.getStylesList = function () {
        return this.http.get(this.orderEntryReq.baseURL + '/MasterClothStyles' + this.orderEntryReq.authReq);
    };
    OrderEntryService.prototype.postOrder = function (order) {
        console.log('PostOrder');
        return this.http.post(this.orderEntryReq.baseURL + '/Orders' + this.orderEntryReq.authReq, order);
    };
    OrderEntryService.prototype.patchOrder = function (id, order) {
        console.log('PostOrder');
        return this.http.patch(this.orderEntryReq.baseURL + '/Orders/' + id + this.orderEntryReq.authReq, order);
    };
    OrderEntryService.prototype.createImageContainer = function (res) {
        console.log('Container Name', res.orderNumber);
        this.http.post(this.orderEntryReq.baseURL + '/OrderSampleImageContainers' + this.orderEntryReq.authReq, {
            "name": res.orderNumber
        }).subscribe(function (res) {
            console.log('Image Container Successfully Created');
        }, function (err) {
            console.log('Image Container Creation Failed');
        });
    };
    OrderEntryService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderEntryService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderEntryService;
}());
exports.OrderEntryService = OrderEntryService;
//# sourceMappingURL=order-entry.service.js.map