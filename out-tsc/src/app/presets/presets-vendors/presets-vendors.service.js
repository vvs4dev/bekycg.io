"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsVendorsService = /** @class */ (function () {
    function PresetsVendorsService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.vendorReq = {};
        this.aVendorContactToEdit = {};
        this.vendorReq.baseURL = appConfig.apiEndpoint;
        this.vendorReq.access_token = user.getActiveUserId();
        this.vendorReq.authReq = '?access_token=' + this.vendorReq.access_token;
        this.vendorReq.buyerFilter = '&filter[fields][id]=true&filter[fields][vendorCode]=true&filter[fields][vendorName]=true';
        console.log('this.vendorReq', this.vendorReq);
    }
    PresetsVendorsService.prototype.getAllVendors = function () {
        return this.http.get(this.vendorReq.baseURL + '/Vendors' + this.vendorReq.authReq + this.vendorReq.buyerFilter);
    };
    PresetsVendorsService.prototype.postVendor = function (vendor) {
        console.log('vendor', vendor);
        if (this.aVendorToEdit) {
            console.log('Patch');
            return this.http.patch(this.vendorReq.baseURL + '/Vendors/' + this.aVendorToEdit.id + this.vendorReq.authReq, vendor);
        }
        else {
            console.log('Post');
            return this.http.post(this.vendorReq.baseURL + '/Vendors' + this.vendorReq.authReq, vendor);
        }
    };
    PresetsVendorsService.prototype.deleteVendor = function (id) {
        return this.http.delete(this.vendorReq.baseURL + '/Vendors/' + id + this.vendorReq.authReq);
    };
    PresetsVendorsService.prototype.getVendorContacts = function (id) {
        return this.http.get(this.vendorReq.baseURL + '/Vendors/' + id + '/VendorContacts' + this.vendorReq.authReq);
    };
    PresetsVendorsService.prototype.postVendorContact = function (vendorId, vendorContact) {
        console.log('vendorContact', vendorContact);
        if (this.aVendorContactToEdit) {
            console.log('Put');
            return this.http.put(this.vendorReq.baseURL + '/Vendors/' + vendorId + '/VendorContacts/' + this.aVendorContactToEdit.id + this.vendorReq.authReq, vendorContact);
        }
        else {
            console.log('Post');
            return this.http.post(this.vendorReq.baseURL + '/Vendors/' + vendorId + '/VendorContacts' + this.vendorReq.authReq, vendorContact);
        }
    };
    PresetsVendorsService.prototype.setActiveVendor = function (vendor) {
        this.aVendor = vendor;
    };
    PresetsVendorsService.prototype.getActiveVendor = function () {
        return this.aVendor;
    };
    PresetsVendorsService.prototype.setActiveVendorToEdit = function (vendor) {
        console.log('setActiveVendorToEdit', vendor);
        this.aVendorToEdit = vendor;
    };
    PresetsVendorsService.prototype.getActiveVendorToEdit = function () {
        console.log('getActiveVendorToEdit', this.aVendorToEdit);
        return this.aVendorToEdit;
    };
    PresetsVendorsService.prototype.setActiveVendorContactToEdit = function (contact) {
        console.log('setActiveVendorContactToEdit', contact);
        this.aVendorContactToEdit = contact;
    };
    PresetsVendorsService.prototype.getActiveVendorContactToEdit = function () {
        console.log('getActiveVendorContactToEdit', this.aVendorContactToEdit);
        return this.aVendorContactToEdit;
    };
    PresetsVendorsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsVendorsService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsVendorsService;
}());
exports.PresetsVendorsService = PresetsVendorsService;
//# sourceMappingURL=presets-vendors.service.js.map