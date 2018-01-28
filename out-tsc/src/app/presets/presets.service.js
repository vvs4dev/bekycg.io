"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../_services/user.service");
var alert_service_1 = require("./../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../app-config.provider");
var PresetsService = /** @class */ (function () {
    function PresetsService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.aAccessoryToEdit = {};
        this.aPackerToEdit = {};
    }
    // ================================================ Master =================================================
    // ================================================ Master =================================================
    PresetsService.prototype.countMaster = 
    // ================================================ Master =================================================
    function (master) {
        return this.http.get(this.appConfig.apiEndpoint + '/cmaster/count/' + master);
    };
    PresetsService.prototype.validateMaster = function (master, code) {
        return this.http.get(this.appConfig.apiEndpoint + '/cmaster/validate/' + master + '/' + code);
    };
    // ================================================ Buyers =================================================
    // ================================================ Vendors =================================================
    // ================================================ Styles =================================================
    // ================================================ Fabrics =================================================
    // ================================================ Treatments =================================================
    // ================================================ Jobworks =================================================
    // ================================================ Accessories =================================================
    // ================================================ Buyers =================================================
    // ================================================ Vendors =================================================
    // ================================================ Styles =================================================
    // ================================================ Fabrics =================================================
    // ================================================ Treatments =================================================
    // ================================================ Jobworks =================================================
    // ================================================ Accessories =================================================
    PresetsService.prototype.getAllAccessories = 
    // ================================================ Buyers =================================================
    // ================================================ Vendors =================================================
    // ================================================ Styles =================================================
    // ================================================ Fabrics =================================================
    // ================================================ Treatments =================================================
    // ================================================ Jobworks =================================================
    // ================================================ Accessories =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/masteraccessory');
    };
    PresetsService.prototype.setActiveAccessoryToEdit = function (accessory) {
        this.aAccessoryToEdit = accessory;
    };
    PresetsService.prototype.getActiveAccessoryToEdit = function () {
        return this.aAccessoryToEdit;
    };
    PresetsService.prototype.updateAccessory = function (accessory) {
        if (this.aAccessoryToEdit) {
            return this.http.put(this.appConfig.apiEndpoint + '/masteraccessory', accessory);
        }
        else {
            return this.http.post(this.appConfig.apiEndpoint + '/masteraccessory', accessory);
        }
    };
    // ================================================ Packers =================================================
    // ================================================ Packers =================================================
    PresetsService.prototype.getAllPackers = 
    // ================================================ Packers =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/masterpacker');
    };
    PresetsService.prototype.setActivePackerToEdit = function (packer) {
        this.aPackerToEdit = packer;
    };
    PresetsService.prototype.getActivePackerToEdit = function () {
        return this.aPackerToEdit;
    };
    PresetsService.prototype.updatePacker = function (packer) {
        console.log('packer', packer);
        if (this.aPackerToEdit) {
            console.log('put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterpacker', packer);
        }
        else {
            console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterpacker', packer);
        }
    };
    PresetsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsService;
}());
exports.PresetsService = PresetsService;
//# sourceMappingURL=presets.service.js.map