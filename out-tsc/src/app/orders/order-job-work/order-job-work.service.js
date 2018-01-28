"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderJobWorkService = /** @class */ (function () {
    function OrderJobWorkService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderJobWorkReq = {};
        this.orderJobWorkReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'orderFilter': '&filter[fields][id]=true&filter[fields][orderNumber]=true',
            'jobworksFilter': '&filter[fields][id]=true&filter[fields][jobworkName]=true&filter[fields][jobworkCode]=true&filter[fields][jobworkRate]=true'
        };
        console.log('this.orderJobWorkReq', this.orderJobWorkReq);
    }
    OrderJobWorkService.prototype.getOrdersList = function () {
        return this.http.get(this.orderJobWorkReq.baseURL + '/Orders' + this.orderJobWorkReq.authReq + this.orderJobWorkReq.orderFilter);
    };
    OrderJobWorkService.prototype.getJobworksList = function () {
        return this.http.get(this.orderJobWorkReq.baseURL + '/MasterJobworks' + this.orderJobWorkReq.authReq + this.orderJobWorkReq.jobworksFilter);
    };
    OrderJobWorkService.prototype.postOrderJobwork = function (order, orderJobwork) {
        return this.http.post(this.orderJobWorkReq.baseURL + '/Orders/' + order + '/OrderJobworks' + this.orderJobWorkReq.authReq, orderJobwork);
    };
    OrderJobWorkService.prototype.findOrderJobwork = function (id) {
        return this.http.get(this.orderJobWorkReq.baseURL + '/OrderJobworks/' + id + this.orderJobWorkReq.authReq);
    };
    OrderJobWorkService.prototype.patchOrderJobwork = function (id, orderJobwork) {
        console.log('patchOrderJobwork');
        return this.http.patch(this.orderJobWorkReq.baseURL + '/OrderJobworks/' + id + this.orderJobWorkReq.authReq, orderJobwork);
    };
    OrderJobWorkService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderJobWorkService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderJobWorkService;
}());
exports.OrderJobWorkService = OrderJobWorkService;
//# sourceMappingURL=order-job-work.service.js.map