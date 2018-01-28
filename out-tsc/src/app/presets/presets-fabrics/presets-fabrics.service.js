"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsFabricsService = /** @class */ (function () {
    function PresetsFabricsService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.fabricReq = {};
        this.authReq = {};
        this.baseURL = {};
        this.aFabricToEdit = {};
        this.fabricReq.baseURL = appConfig.apiEndpoint;
        this.fabricReq.access_token = user.getActiveUserId();
        this.fabricReq.authReq = '?access_token=' + this.fabricReq.access_token;
        this.fabricReq.fabricFilter = '&filter[fields][id]=true&filter[fields][fabricMaterialName]=true&filter[fields][fabricMaterialWeight]=true&filter[fields][fabricMaterialType]=true&filter[fields][fabricMaterialCode]=true';
        console.log('this.fabricReq', this.fabricReq);
    }
    PresetsFabricsService.prototype.getAllFabrics = function () {
        return this.http.get(this.fabricReq.baseURL + '/MasterFabricMaterials' + this.fabricReq.authReq + this.fabricReq.fabricFilter);
    };
    PresetsFabricsService.prototype.setActiveFabricToEdit = function (fabric) {
        this.aFabricToEdit = fabric;
    };
    PresetsFabricsService.prototype.getActiveFabricToEdit = function () {
        return this.aFabricToEdit;
    };
    PresetsFabricsService.prototype.postFabric = function (fabric) {
        console.log('fabric', fabric);
        if (this.aFabricToEdit) {
            console.log('Patch');
            return this.http.patch(this.fabricReq.baseURL + '/MasterFabricMaterials/' + this.aFabricToEdit.id + this.fabricReq.authReq, fabric);
        }
        else {
            console.log('Post');
            return this.http.post(this.fabricReq.baseURL + '/MasterFabricMaterials' + this.fabricReq.authReq, fabric);
        }
    };
    PresetsFabricsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsFabricsService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsFabricsService;
}());
exports.PresetsFabricsService = PresetsFabricsService;
//# sourceMappingURL=presets-fabrics.service.js.map