"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../_services/user.service");
var alert_service_1 = require("./../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../app-config.provider");
var SettingsService = /** @class */ (function () {
    function SettingsService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
    }
    SettingsService.prototype.getMyOrganisation = function (user) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/organisation/myorg/' + user);
    };
    // ========================================== Organisation ===============================================
    // ========================================== Organisation ===============================================
    SettingsService.prototype.postOrganisation = 
    // ========================================== Organisation ===============================================
    function (organisation) {
        return this.http.post(this.appConfig.apiEndpoint + '/organisation', organisation);
    };
    SettingsService.prototype.findOrganisation = function (code) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/organisation/data/' + code);
    };
    SettingsService.prototype.checkOrganisationExistance = function (code) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/organisation/check/' + code);
    };
    SettingsService.prototype.updateOrganisation = function (organisation) {
        return this.http.put(this.appConfig.apiEndpoint + '/organisation', organisation);
    };
    // ========================================== Branch ===============================================
    // ========================================== Branch ===============================================
    SettingsService.prototype.postBranch = 
    // ========================================== Branch ===============================================
    function (branch) {
        return this.http.post(this.appConfig.apiEndpoint + '/branch', branch);
    };
    SettingsService.prototype.findBranch = function (branchCode) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/branch/data/' + branchCode);
    };
    SettingsService.prototype.checkBranchExistance = function (branchCode) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/branch/check/' + branchCode);
    };
    SettingsService.prototype.updateBranch = function (branch) {
        return this.http.put(this.appConfig.apiEndpoint + '/branch', branch);
    };
    // ========================================== Department ===============================================
    // ========================================== Department ===============================================
    SettingsService.prototype.postDepartment = 
    // ========================================== Department ===============================================
    function (department) {
        return this.http.post(this.appConfig.apiEndpoint + '/department', department);
    };
    SettingsService.prototype.findDepartment = function (departmentCode) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/department/data/' + departmentCode);
    };
    SettingsService.prototype.checkDepartmentExistance = function (departmentCode) {
        return this.http.get(this.appConfig.apiEndpoint + '/csettings/department/check/' + departmentCode);
    };
    SettingsService.prototype.updateDepartment = function (department) {
        return this.http.put(this.appConfig.apiEndpoint + '/department', department);
    };
    SettingsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SettingsService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map