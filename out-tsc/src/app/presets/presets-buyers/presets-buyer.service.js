"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsBuyerService = /** @class */ (function () {
    function PresetsBuyerService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.buyerReq = {};
        this.aBuyerContactToEdit = {};
        this.buyerReq.baseURL = appConfig.apiEndpoint;
        this.buyerReq.access_token = user.getActiveUserId();
        this.buyerReq.authReq = '?access_token=' + this.buyerReq.access_token;
        this.buyerReq.buyerFilter = '&filter[fields][id]=true&filter[fields][brandCode]=true&filter[fields][brandName]=true';
        console.log('this.buyerReq', this.buyerReq);
    }
    PresetsBuyerService.prototype.getAllBuyers = function () {
        return this.http.get(this.buyerReq.baseURL + '/Buyers' + this.buyerReq.authReq + this.buyerReq.buyerFilter);
    };
    PresetsBuyerService.prototype.postBuyer = function (buyer) {
        console.log('buyer', buyer);
        if (this.aBuyerToEdit) {
            console.log('Patch');
            return this.http.patch(this.buyerReq.baseURL + '/Buyers/' + this.aBuyerToEdit.id + this.buyerReq.authReq, buyer);
        }
        else {
            console.log('Post');
            return this.http.post(this.buyerReq.baseURL + '/Buyers' + this.buyerReq.authReq, buyer);
        }
    };
    PresetsBuyerService.prototype.deleteBuyer = function (id) {
        return this.http.delete(this.buyerReq.baseURL + '/Buyers/' + id + this.buyerReq.authReq);
    };
    PresetsBuyerService.prototype.getBuyerContacts = function (id) {
        return this.http.get(this.buyerReq.baseURL + '/Buyers/' + id + '/BuyerContacts' + this.buyerReq.authReq);
    };
    PresetsBuyerService.prototype.postBuyerContact = function (buyerId, buyerContact) {
        console.log('buyerContact', buyerContact);
        if (this.aBuyerContactToEdit) {
            console.log('Put');
            return this.http.put(this.buyerReq.baseURL + '/Buyers/' + buyerId + '/BuyerContacts/' + this.aBuyerContactToEdit.id + this.buyerReq.authReq, buyerContact);
        }
        else {
            console.log('Post');
            return this.http.post(this.buyerReq.baseURL + '/Buyers/' + buyerId + '/BuyerContacts' + this.buyerReq.authReq, buyerContact);
        }
    };
    PresetsBuyerService.prototype.setActiveBuyer = function (buyer) {
        this.aBuyer = buyer;
    };
    PresetsBuyerService.prototype.getActiveBuyer = function () {
        return this.aBuyer;
    };
    PresetsBuyerService.prototype.setActiveBuyerToEdit = function (buyer) {
        console.log('setActiveBuyerToEdit', buyer);
        this.aBuyerToEdit = buyer;
    };
    PresetsBuyerService.prototype.getActiveBuyerToEdit = function () {
        console.log('getActiveBuyerToEdit', this.aBuyerToEdit);
        return this.aBuyerToEdit;
    };
    PresetsBuyerService.prototype.setActiveBuyerContactToEdit = function (contact) {
        console.log('setActiveBuyerContactToEdit', contact);
        this.aBuyerContactToEdit = contact;
    };
    PresetsBuyerService.prototype.getActiveBuyerContactToEdit = function () {
        console.log('getActiveBuyerContactToEdit', this.aBuyerContactToEdit);
        return this.aBuyerContactToEdit;
    };
    PresetsBuyerService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsBuyerService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsBuyerService;
}());
exports.PresetsBuyerService = PresetsBuyerService;
//# sourceMappingURL=presets-buyer.service.js.map