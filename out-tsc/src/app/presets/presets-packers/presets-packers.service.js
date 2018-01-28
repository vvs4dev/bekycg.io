"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsPackersService = /** @class */ (function () {
    function PresetsPackersService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.packerReq = {};
        this.authReq = {};
        this.baseURL = {};
        this.aPackerToEdit = {};
        this.packerReq.baseURL = appConfig.apiEndpoint;
        this.packerReq.access_token = user.getActiveUserId();
        this.packerReq.authReq = '?access_token=' + this.packerReq.access_token;
        this.packerReq.packerFilter = '&filter[fields][id]=true&filter[fields][packingMaterialCode]=true&filter[fields][packingMaterialName]=true&filter[fields][packingMaterialType]=true&filter[fields][packingMaterialDescription]=true';
        console.log('this.packerReq', this.packerReq);
        this.aPackerToEdit = null;
    }
    PresetsPackersService.prototype.getAllPackers = function () {
        return this.http.get(this.packerReq.baseURL + '/MasterPackingMaterials' + this.packerReq.authReq + this.packerReq.packerFilter);
    };
    PresetsPackersService.prototype.setActivePackerToEdit = function (packer) {
        this.aPackerToEdit = packer;
    };
    PresetsPackersService.prototype.getActivePackerToEdit = function () {
        return this.aPackerToEdit;
    };
    PresetsPackersService.prototype.postPacker = function (packer) {
        console.log('packer', packer);
        if (this.aPackerToEdit) {
            console.log('Patch');
            return this.http.patch(this.packerReq.baseURL + '/MasterPackingMaterials/' + this.aPackerToEdit.id + this.packerReq.authReq, packer);
        }
        else {
            console.log('Post');
            return this.http.post(this.packerReq.baseURL + '/MasterPackingMaterials' + this.packerReq.authReq, packer);
        }
    };
    PresetsPackersService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsPackersService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsPackersService;
}());
exports.PresetsPackersService = PresetsPackersService;
//# sourceMappingURL=presets-packers.service.js.map