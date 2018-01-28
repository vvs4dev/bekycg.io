"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_buyer_service_1 = require("./presets-buyer.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsBuyersComponent = /** @class */ (function () {
    function PresetsBuyersComponent(appComponent, presetsBuyerService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsBuyerService = presetsBuyerService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedBuyerItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Buyers', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllBuyers();
    }
    PresetsBuyersComponent.prototype.addNewBuyer = function () {
        console.log('addNewBuyer');
        this.router.navigate(['/presets/buyers/form']);
    };
    PresetsBuyersComponent.prototype.editBuyer = function (buyer) {
        var _this = this;
        this.presetsBuyerService.setActiveBuyerToEdit(buyer);
        setTimeout(function () { _this.router.navigate(['/presets/buyers/form']), 500; });
    };
    PresetsBuyersComponent.prototype.deleteBuyer = function (id) {
        var _this = this;
        console.log('deleteBuyerById', id);
        this.presetsBuyerService.deleteBuyer(id)
            .subscribe(function (res) {
            console.log('deleteBuyer-Response', res);
            _this.loading = '';
            _this.alert.success('Buyer Deleted Successfully');
            _this.fetchAllBuyers();
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
    PresetsBuyersComponent.prototype.addBuyerContact = function (aBuyer) {
        var _this = this;
        this.presetsBuyerService.setActiveBuyer(aBuyer);
        setTimeout(function () { _this.router.navigate(['/presets/buyer/' + aBuyer.brandCode + '/contacts/form']); }, 500);
    };
    PresetsBuyersComponent.prototype.fetchAllBuyers = function () {
        var _this = this;
        this.loading = 'getBuyers';
        this.presetsBuyerService.getAllBuyers()
            .subscribe(function (res) {
            console.log('getAllBuyers-Response', res);
            _this.buyers = res;
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
    PresetsBuyersComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedBuyerItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsBuyersComponent.prototype.viewBuyerContact = function (buyer) {
        var _this = this;
        this.aBuyer = buyer;
        this.loading = 'getBuyerContacts';
        console.log('aBuyer', this.aBuyer);
        this.presetsBuyerService.getBuyerContacts(this.aBuyer.id)
            .subscribe(function (res) {
            console.log('getBuyerContacts-Response', res);
            _this.buyerContacts = res;
            _this.loading = '';
        }, function (err) {
            console.log('Error', err);
        });
    };
    PresetsBuyersComponent.prototype.editBuyerContact = function (buyerContact) {
        var _this = this;
        console.log('editBuyerContact', 'aBuyer', this.aBuyer);
        this.presetsBuyerService.setActiveBuyer(this.aBuyer);
        this.presetsBuyerService.setActiveBuyerContactToEdit(buyerContact);
        setTimeout(function () { _this.router.navigate(['/presets/buyer/' + _this.aBuyer.brandCode + '/contacts/form']), 500; });
    };
    PresetsBuyersComponent.prototype.ngOnInit = function () {
        this.presetsBuyerService.setActiveBuyerToEdit(null);
        this.presetsBuyerService.setActiveBuyerContactToEdit(null);
    };
    PresetsBuyersComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-buyers',
                    templateUrl: './presets-buyers.component.html',
                    styleUrls: ['./presets-buyers.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsBuyersComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_buyer_service_1.PresetsBuyerService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsBuyersComponent;
}());
exports.PresetsBuyersComponent = PresetsBuyersComponent;
//# sourceMappingURL=presets-buyers.component.js.map