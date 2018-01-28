"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderAccessoriesService = /** @class */ (function () {
    function OrderAccessoriesService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderAccessoriesReq = {};
        this.orderAccessoriesReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'orderFilter': '&filter[fields][id]=true&filter[fields][orderNumber]=true',
            'accessoriesFilter': '&filter[fields][id]=true&filter[fields][accessoryItemName]=true&filter[fields][accessoryItemCode]=true&filter[fields][accessoryItemType]=true&filter[fields][accessoryItemDescription]=true'
        };
        console.log('this.orderAccessoriesReq', this.orderAccessoriesReq);
    }
    OrderAccessoriesService.prototype.getOrdersList = function () {
        return this.http.get(this.orderAccessoriesReq.baseURL + '/Orders' + this.orderAccessoriesReq.authReq + this.orderAccessoriesReq.orderFilter);
    };
    OrderAccessoriesService.prototype.getAccessoriesList = function () {
        return this.http.get(this.orderAccessoriesReq.baseURL + '/MasterAccessories' + this.orderAccessoriesReq.authReq + this.orderAccessoriesReq.accessoriesFilter);
    };
    OrderAccessoriesService.prototype.postOrderAccessories = function (order, orderAccessories) {
        return this.http.post(this.orderAccessoriesReq.baseURL + '/Orders/' + order + '/OrderAccessories' + this.orderAccessoriesReq.authReq, orderAccessories);
    };
    OrderAccessoriesService.prototype.findOrderAccessories = function (id) {
        return this.http.get(this.orderAccessoriesReq.baseURL + '/OrderAccessories/' + id + this.orderAccessoriesReq.authReq);
    };
    OrderAccessoriesService.prototype.patchOrderAccessories = function (id, orderAccessory) {
        console.log('patchOrderJobwork');
        return this.http.patch(this.orderAccessoriesReq.baseURL + '/OrderAccessories/' + id + this.orderAccessoriesReq.authReq, orderAccessory);
    };
    OrderAccessoriesService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderAccessoriesService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderAccessoriesService;
}());
exports.OrderAccessoriesService = OrderAccessoriesService;
//# sourceMappingURL=order-accessories.service.js.map