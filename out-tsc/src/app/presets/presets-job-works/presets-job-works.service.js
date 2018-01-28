"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsJobWorksService = /** @class */ (function () {
    function PresetsJobWorksService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.jobworksReq = {};
        this.authReq = {};
        this.baseURL = {};
        this.aJobworkToEdit = {};
        this.jobworksReq.baseURL = appConfig.apiEndpoint;
        this.jobworksReq.access_token = user.getActiveUserId();
        this.jobworksReq.authReq = '?access_token=' + this.jobworksReq.access_token;
        this.jobworksReq.jobworksFilter = '&filter[fields][id]=true&filter[fields][jobworkCode]=true&filter[fields][jobworkName]=true&filter[fields][jobworkRate]=true&filter[fields][jobworkDescription]=true';
        console.log('this.jobworksReq', this.jobworksReq);
        this.aJobworkToEdit = null;
    }
    PresetsJobWorksService.prototype.getAllJobworks = function () {
        return this.http.get(this.jobworksReq.baseURL + '/MasterJobworks' + this.jobworksReq.authReq + this.jobworksReq.jobworksFilter);
    };
    PresetsJobWorksService.prototype.setActiveJobworkToEdit = function (style) {
        this.aJobworkToEdit = style;
    };
    PresetsJobWorksService.prototype.getActiveJobworkToEdit = function () {
        return this.aJobworkToEdit;
    };
    PresetsJobWorksService.prototype.postJobwork = function (jobwork) {
        console.log('jobwork', jobwork);
        if (this.aJobworkToEdit) {
            console.log('Patch');
            return this.http.patch(this.jobworksReq.baseURL + '/MasterJobworks/' + this.aJobworkToEdit.id + this.jobworksReq.authReq, jobwork);
        }
        else {
            console.log('Post');
            return this.http.post(this.jobworksReq.baseURL + '/MasterJobworks' + this.jobworksReq.authReq, jobwork);
        }
    };
    PresetsJobWorksService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsJobWorksService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsJobWorksService;
}());
exports.PresetsJobWorksService = PresetsJobWorksService;
//# sourceMappingURL=presets-job-works.service.js.map