"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_service_1 = require("./../presets.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsVendorsComponent = /** @class */ (function () {
    function PresetsVendorsComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
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
        this.myBreadCrumb.crumbs = [
            { 'menu': 'Presets', 'routerLink': '/presets' }
        ];
        this.myBreadCrumb.active = 'Vendors';
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllVendors();
    }
    PresetsVendorsComponent.prototype.addNewVendor = function () {
        // console.log('addNewVendor');
        this.router.navigate(['/presets/vendor/add/new']);
    };
    PresetsVendorsComponent.prototype.editVendor = function (vendor) {
        var _this = this;
        setTimeout(function () { _this.router.navigate(['/presets/vendor/edit/' + vendor.vendorCode]), 500; });
    };
    PresetsVendorsComponent.prototype.deleteVendor = function (id) {
        var _this = this;
        // console.log('deleteVendorById', id);
        this.presetsService.deleteVendor(id)
            .subscribe(function (res) {
            // console.log('deleteVendor-Response', res);
            // console.log('deleteVendor-Response', res);
            _this.loading = '';
            _this.alert.success('Vendor Deleted Successfully');
            _this.fetchAllVendors();
        }, function (err) {
            // console.log('err',err);
            // console.log('err',err);
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
        setTimeout(function () { _this.router.navigate(['/presets/vendor/' + aVendor.vendorCode + '/contact/add/new']); }, 500);
    };
    PresetsVendorsComponent.prototype.fetchAllVendors = function () {
        var _this = this;
        this.loading = 'getVendors';
        this.presetsService.getAllVendors()
            .subscribe(function (res) {
            // console.log('getAllVendors-Response',res);
            // console.log('getAllVendors-Response',res);
            _this.vendors = res;
            _this.allItems = res;
            _this.setPage(1);
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
        // console.log('aVendor', this.aVendor);
        this.presetsService.getVendorContacts(this.aVendor.vendorCode)
            .subscribe(function (res) {
            // console.log('getVendorContacts-Response',res);
            // console.log('getVendorContacts-Response',res);
            _this.vendorContacts = res;
            _this.loading = '';
        }, function (err) {
            // console.log('Error', err);
        });
    };
    PresetsVendorsComponent.prototype.editVendorContact = function (vendorContact) {
        var _this = this;
        // console.log('editVendorContact', 'aVendor', this.aVendor)
        setTimeout(function () { _this.router.navigate(['/presets/vendor/' + _this.aVendor.vendorCode + '/contact/edit/' + vendorContact.contactEmail]), 500; });
    };
    PresetsVendorsComponent.prototype.ngOnInit = function () {
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
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsVendorsComponent;
}());
exports.PresetsVendorsComponent = PresetsVendorsComponent;
//# sourceMappingURL=presets-vendors.component.js.map