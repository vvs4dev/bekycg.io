"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var OrderFabricsService = /** @class */ (function () {
    function OrderFabricsService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.orderFabricReq = {};
        this.orderFabricReq = {
            'baseURL': appConfig.apiEndpoint,
            'access_token': user.getActiveUserId(),
            'authReq': '?access_token=' + user.getActiveUserId(),
            'orderFilter': '&filter[fields][id]=true&filter[fields][orderNumber]=true',
            'masterFabricMaterialsFilter': '&filter[fields][id]=true&filter[fields][fabricMaterialName]=true&filter[fields][fabricMaterialCode]=true&filter[fields][fabricMaterialWeight]=true&filter[fields][fabricMaterialType]=true',
            'masterSpecialTreatmentsFilter': '&filter[fields][id]=true&filter[fields][specialTreatmentName]=true&filter[fields][specialTreatmentCode]=true'
        };
        console.log('this.orderFabricReq', this.orderFabricReq);
    }
    OrderFabricsService.prototype.getOrderFabricReq = function () {
        return this.orderFabricReq;
    };
    OrderFabricsService.prototype.getFabricsList = function () {
        return this.http.get(this.orderFabricReq.baseURL + '/MasterFabricMaterials' + this.orderFabricReq.authReq + this.orderFabricReq.masterFabricMaterialsFilter);
    };
    OrderFabricsService.prototype.getTreatmentsList = function () {
        return this.http.get(this.orderFabricReq.baseURL + '/MasterSpecialTreatments' + this.orderFabricReq.authReq + this.orderFabricReq.masterSpecialTreatmentsFilter);
    };
    OrderFabricsService.prototype.postOrderFabric = function (order, orderFabric) {
        console.log('PostOrderFabric');
        return this.http.post(this.orderFabricReq.baseURL + '/Orders/' + order.id + '/OrderFabrics' + this.orderFabricReq.authReq, orderFabric);
    };
    OrderFabricsService.prototype.patchOrderFabric = function (id, orderFabric) {
        console.log('patchOrderFabric');
        return this.http.patch(this.orderFabricReq.baseURL + '/OrderFabrics/' + id + this.orderFabricReq.authReq, orderFabric);
    };
    OrderFabricsService.prototype.findOrderFabric = function (id) {
        return this.http.get(this.orderFabricReq.baseURL + '/OrderFabrics/' + id + this.orderFabricReq.authReq);
    };
    OrderFabricsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OrderFabricsService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return OrderFabricsService;
}());
exports.OrderFabricsService = OrderFabricsService;
//# sourceMappingURL=order-fabrics.service.js.map