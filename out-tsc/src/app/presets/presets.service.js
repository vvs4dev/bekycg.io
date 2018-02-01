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
        this.aFabricToEdit = {};
        this.aJobworkToEdit = {};
        this.aStyleToEdit = {};
        this.aTreatmentToEdit = {};
        this.aBuyerContactToEdit = {};
        this.aVendorContactToEdit = {};
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
    // ================================================ Styles =================================================
    // ================================================ Styles =================================================
    PresetsService.prototype.getAllStyles = 
    // ================================================ Styles =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/masterstyle');
    };
    PresetsService.prototype.setActiveStyleToEdit = function (style) {
        this.aStyleToEdit = style;
    };
    PresetsService.prototype.getActiveStyleToEdit = function () {
        return this.aStyleToEdit;
    };
    PresetsService.prototype.updateStyle = function (style) {
        // console.log('style', style);
        if (this.aStyleToEdit) {
            // console.log('put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterstyle', style);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterstyle', style);
        }
    };
    // ================================================ Fabrics =================================================
    // ================================================ Fabrics =================================================
    PresetsService.prototype.getAllFabrics = 
    // ================================================ Fabrics =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/masterfabric');
    };
    PresetsService.prototype.setActiveFabricToEdit = function (fabric) {
        this.aFabricToEdit = fabric;
    };
    PresetsService.prototype.getActiveFabricToEdit = function () {
        return this.aFabricToEdit;
    };
    PresetsService.prototype.updateFabric = function (fabric) {
        // console.log('fabric', fabric);
        if (this.aFabricToEdit) {
            // console.log('put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterfabric', fabric);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterfabric', fabric);
        }
    };
    // ================================================ Treatments =================================================
    // ================================================ Treatments =================================================
    PresetsService.prototype.getAllTreatments = 
    // ================================================ Treatments =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/mastertreatment');
    };
    PresetsService.prototype.setActiveTreatmentToEdit = function (style) {
        this.aTreatmentToEdit = style;
    };
    PresetsService.prototype.getActiveTreatmentToEdit = function () {
        return this.aTreatmentToEdit;
    };
    PresetsService.prototype.updateTreatment = function (treatment) {
        // console.log('treatment', treatment);
        if (this.aTreatmentToEdit) {
            // console.log('Put');
            return this.http.put(this.appConfig.apiEndpoint + '/mastertreatment', treatment);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/mastertreatment', treatment);
        }
    };
    // ================================================ Jobs =================================================
    // ================================================ Jobs =================================================
    PresetsService.prototype.getAllJobs = 
    // ================================================ Jobs =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/masterjob');
    };
    PresetsService.prototype.setActiveJobToEdit = function (style) {
        this.aJobworkToEdit = style;
    };
    PresetsService.prototype.getActiveJobToEdit = function () {
        return this.aJobworkToEdit;
    };
    PresetsService.prototype.updateJob = function (job) {
        // console.log('jobwork', jobwork);
        if (this.aJobworkToEdit) {
            // console.log('Put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterjob', job);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterjob', job);
        }
    };
    // ================================================ Accessories =================================================
    // ================================================ Accessories =================================================
    PresetsService.prototype.getAllAccessories = 
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
        // console.log('packer', packer);
        if (this.aPackerToEdit) {
            // console.log('put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterpacker', packer);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterpacker', packer);
        }
    };
    // ================================================ Buyers =================================================
    // ================================================ Buyers =================================================
    PresetsService.prototype.getAllBuyers = 
    // ================================================ Buyers =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/masterbuyer');
    };
    PresetsService.prototype.updateBuyer = function (buyer) {
        // console.log('buyer', buyer);
        if (this.aBuyerToEdit) {
            // console.log('Put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterbuyer', buyer);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterbuyer', buyer);
        }
    };
    PresetsService.prototype.deleteBuyer = function (id) {
        return this.http.delete(this.appConfig.apiEndpoint + '/masterbuyer');
    };
    PresetsService.prototype.getBuyerContacts = function (buyerCode) {
        return this.http.get(this.appConfig.apiEndpoint + '/cmaster/contact/buyer/' + buyerCode);
    };
    PresetsService.prototype.postBuyerContact = function (buyerId, buyerContact) {
        // console.log('buyerContact', buyerContact);
        if (this.aBuyerContactToEdit) {
            // console.log('Put');
            return this.http.put(this.appConfig.apiEndpoint + '/masterbuyercontact', buyerContact);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/masterbuyercontact', buyerContact);
        }
    };
    PresetsService.prototype.setActiveBuyer = function (buyer) {
        this.aBuyer = buyer;
    };
    PresetsService.prototype.getActiveBuyer = function () {
        return this.aBuyer;
    };
    PresetsService.prototype.setActiveBuyerToEdit = function (buyer) {
        // console.log('setActiveBuyerToEdit', buyer);
        delete buyer['createdDate'];
        delete buyer['createdBy'];
        delete buyer['lastModifiedDate'];
        delete buyer['lastModifiedBy'];
        this.aBuyerToEdit = buyer;
    };
    PresetsService.prototype.getActiveBuyerToEdit = function () {
        // console.log('getActiveBuyerToEdit', this.aBuyerToEdit);
        return this.aBuyerToEdit;
    };
    PresetsService.prototype.setActiveBuyerContactToEdit = function (contact) {
        // console.log('setActiveBuyerContactToEdit', contact);
        delete contact['createdDate'];
        delete contact['createdBy'];
        delete contact['lastModifiedDate'];
        delete contact['lastModifiedBy'];
        this.aBuyerContactToEdit = contact;
    };
    PresetsService.prototype.getActiveBuyerContactToEdit = function () {
        // console.log('getActiveBuyerContactToEdit', this.aBuyerContactToEdit);
        return this.aBuyerContactToEdit;
    };
    // ================================================ Vendors =================================================
    // ================================================ Vendors =================================================
    PresetsService.prototype.getAllVendors = 
    // ================================================ Vendors =================================================
    function () {
        return this.http.get(this.appConfig.apiEndpoint + '/mastervendor');
    };
    PresetsService.prototype.updateVendor = function (vendor) {
        // console.log('vendor', vendor);
        if (this.aVendorToEdit) {
            // console.log('Put');
            return this.http.put(this.appConfig.apiEndpoint + '/mastervendor', vendor);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/mastervendor', vendor);
        }
    };
    PresetsService.prototype.deleteVendor = function (id) {
        return this.http.delete(this.appConfig.apiEndpoint + '/mastervendor');
    };
    PresetsService.prototype.getVendorContacts = function (vendorCode) {
        return this.http.get(this.appConfig.apiEndpoint + '/cmaster/contact/vendor/' + vendorCode);
    };
    PresetsService.prototype.postVendorContact = function (vendorId, vendorContact) {
        // console.log('vendorContact', vendorContact);
        if (this.aVendorContactToEdit) {
            // console.log('Put');
            return this.http.put(this.appConfig.apiEndpoint + '/mastervendorcontact', vendorContact);
        }
        else {
            // console.log('Post');
            return this.http.post(this.appConfig.apiEndpoint + '/mastervendorcontact', vendorContact);
        }
    };
    PresetsService.prototype.setActiveVendor = function (vendor) {
        this.aVendor = vendor;
    };
    PresetsService.prototype.getActiveVendor = function () {
        return this.aVendor;
    };
    PresetsService.prototype.setActiveVendorToEdit = function (vendor) {
        // console.log('setActiveVendorToEdit', vendor);
        delete vendor['createdDate'];
        delete vendor['createdBy'];
        delete vendor['lastModifiedDate'];
        delete vendor['lastModifiedBy'];
        this.aVendorToEdit = vendor;
    };
    PresetsService.prototype.getActiveVendorToEdit = function () {
        // console.log('getActiveVendorToEdit', this.aVendorToEdit);
        return this.aVendorToEdit;
    };
    PresetsService.prototype.setActiveVendorContactToEdit = function (contact) {
        // console.log('setActiveVendorContactToEdit', contact);
        delete contact['createdDate'];
        delete contact['createdBy'];
        delete contact['lastModifiedDate'];
        delete contact['lastModifiedBy'];
        this.aVendorContactToEdit = contact;
    };
    PresetsService.prototype.getActiveVendorContactToEdit = function () {
        // console.log('getActiveVendorContactToEdit', this.aVendorContactToEdit);
        return this.aVendorContactToEdit;
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