"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_vendors_service_1 = require("./presets-vendors.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsVendorsComponent = /** @class */ (function () {
    function PresetsVendorsComponent(appComponent, presetsVendorsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsVendorsService = presetsVendorsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedVendorItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Vendors', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllVendors();
    }
    PresetsVendorsComponent.prototype.addNewVendor = function () {
        console.log('addNewVendor');
        this.router.navigate(['/presets/vendors/form']);
    };
    PresetsVendorsComponent.prototype.editVendor = function (vendor) {
        var _this = this;
        this.presetsVendorsService.setActiveVendorToEdit(vendor);
        setTimeout(function () { _this.router.navigate(['/presets/vendors/form']), 500; });
    };
    PresetsVendorsComponent.prototype.deleteVendor = function (id) {
        var _this = this;
        console.log('deleteVendorById', id);
        this.presetsVendorsService.deleteVendor(id)
            .subscribe(function (res) {
            console.log('deleteVendor-Response', res);
            _this.loading = '';
            _this.alert.success('Vendor Deleted Successfully');
            _this.fetchAllVendors();
        }, function (err) {
            console.log('err', err);
            _this.loading = '';
            // Defining the Error Messages
            switch (err.status) {
                case 401:
                    _this.alert.error('Invalid Username Or Password');
                    break;
                default:
                    _this.alert.error('Some Error Occured');
                    break;
            }
        });
    };
    PresetsVendorsComponent.prototype.addVendorContact = function (aVendor) {
        var _this = this;
        this.presetsVendorsService.setActiveVendor(aVendor);
        setTimeout(function () { _this.router.navigate(['/presets/vendor/' + aVendor.vendorCode + '/contacts/form']); }, 500);
    };
    PresetsVendorsComponent.prototype.fetchAllVendors = function () {
        var _this = this;
        this.loading = 'getVendors';
        this.presetsVendorsService.getAllVendors()
            .subscribe(function (res) {
            console.log('getAllVendors-Response', res);
            _this.vendors = res;
            _this.allItems = res;
            _this.setPage(1);
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            console.log('err', err);
            _this.loading = '';
            // Defining the Error Messages
            switch (err.status) {
                case 401:
                    _this.alert.error('Invalid Username Or Password');
                    break;
                default:
                    _this.alert.error('Some Error Occured');
                    break;
            }
        });
    };
    PresetsVendorsComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedVendorItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsVendorsComponent.prototype.viewVendorContact = function (vendor) {
        var _this = this;
        this.aVendor = vendor;
        this.loading = 'getVendorContacts';
        console.log('aVendor', this.aVendor);
        this.presetsVendorsService.getVendorContacts(this.aVendor.id)
            .subscribe(function (res) {
            console.log('getVendorContacts-Response', res);
            _this.vendorContacts = res;
            _this.loading = '';
        }, function (err) {
            console.log('Error', err);
        });
    };
    PresetsVendorsComponent.prototype.editVendorContact = function (vendorContact) {
        var _this = this;
        console.log('editVendorContact', 'aVendor', this.aVendor);
        this.presetsVendorsService.setActiveVendor(this.aVendor);
        this.presetsVendorsService.setActiveVendorContactToEdit(vendorContact);
        setTimeout(function () { _this.router.navigate(['/presets/vendor/' + _this.aVendor.vendorCode + '/contacts/form']), 500; });
    };
    PresetsVendorsComponent.prototype.ngOnInit = function () {
        this.presetsVendorsService.setActiveVendorToEdit(null);
        this.presetsVendorsService.setActiveVendorContactToEdit(null);
    };
    PresetsVendorsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-vendors',
                    templateUrl: './presets-vendors.component.html',
                    styleUrls: ['./presets-vendors.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsVendorsComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_vendors_service_1.PresetsVendorsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsVendorsComponent;
}());
exports.PresetsVendorsComponent = PresetsVendorsComponent;
//# sourceMappingURL=presets-vendors.component.js.map