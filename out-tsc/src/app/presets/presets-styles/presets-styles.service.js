"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsStylesService = /** @class */ (function () {
    function PresetsStylesService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.styleReq = {};
        this.authReq = {};
        this.baseURL = {};
        this.aStyleToEdit = {};
        this.styleReq.baseURL = appConfig.apiEndpoint;
        this.styleReq.access_token = user.getActiveUserId();
        this.styleReq.authReq = '?access_token=' + this.styleReq.access_token;
        this.styleReq.styleFilter = '&filter[fields][id]=true&filter[fields][styleCode]=true&filter[fields][styleName]=true&filter[fields][styleForGender]=true&filter[fields][styleDescription]=true';
        console.log('this.styleReq', this.styleReq);
    }
    PresetsStylesService.prototype.getAllStyles = function () {
        return this.http.get(this.styleReq.baseURL + '/MasterClothStyles' + this.styleReq.authReq + this.styleReq.styleFilter);
    };
    PresetsStylesService.prototype.setActiveStyleToEdit = function (style) {
        this.aStyleToEdit = style;
    };
    PresetsStylesService.prototype.getActiveStyleToEdit = function () {
        return this.aStyleToEdit;
    };
    PresetsStylesService.prototype.postStyle = function (style) {
        console.log('style', style);
        if (this.aStyleToEdit) {
            console.log('Patch');
            return this.http.patch(this.styleReq.baseURL + '/MasterClothStyles/' + this.aStyleToEdit.id + this.styleReq.authReq, style);
        }
        else {
            console.log('Post');
            return this.http.post(this.styleReq.baseURL + '/MasterClothStyles' + this.styleReq.authReq, style);
        }
    };
    PresetsStylesService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsStylesService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsStylesService;
}());
exports.PresetsStylesService = PresetsStylesService;
//# sourceMappingURL=presets-styles.service.js.map