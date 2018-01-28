"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
require("rxjs/add/operator/map");
var app_config_provider_1 = require("./../../app-config.provider");
var PresetsTreatmentsService = /** @class */ (function () {
    function PresetsTreatmentsService(user, http, router, aRoute, alert, appConfig) {
        this.user = user;
        this.http = http;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appConfig = appConfig;
        this.treatmentReq = {};
        this.authReq = {};
        this.baseURL = {};
        this.aTreatmentToEdit = {};
        this.treatmentReq.baseURL = appConfig.apiEndpoint;
        this.treatmentReq.access_token = user.getActiveUserId();
        this.treatmentReq.authReq = '?access_token=' + this.treatmentReq.access_token;
        this.treatmentReq.treatmentFilter = '&filter[fields][id]=true&filter[fields][specialTreatmentCode]=true&filter[fields][specialTreatmentName]=true&filter[fields][specialTreatmentCost]=true&filter[fields][specialTreatmentDescription]=true';
        console.log('this.treatmentReq', this.treatmentReq);
        this.aTreatmentToEdit = null;
    }
    PresetsTreatmentsService.prototype.getAllTreatments = function () {
        return this.http.get(this.treatmentReq.baseURL + '/MasterSpecialTreatments' + this.treatmentReq.authReq + this.treatmentReq.treatmentFilter);
    };
    PresetsTreatmentsService.prototype.setActiveTreatmentToEdit = function (style) {
        this.aTreatmentToEdit = style;
    };
    PresetsTreatmentsService.prototype.getActiveTreatmentToEdit = function () {
        return this.aTreatmentToEdit;
    };
    PresetsTreatmentsService.prototype.postTreatment = function (treatment) {
        console.log('treatment', treatment);
        if (this.aTreatmentToEdit) {
            console.log('Patch');
            return this.http.patch(this.treatmentReq.baseURL + '/MasterSpecialTreatments/' + this.aTreatmentToEdit.id + this.treatmentReq.authReq, treatment);
        }
        else {
            console.log('Post');
            return this.http.post(this.treatmentReq.baseURL + '/MasterSpecialTreatments' + this.treatmentReq.authReq, treatment);
        }
    };
    PresetsTreatmentsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PresetsTreatmentsService.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: http_1.HttpClient, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_config_provider_1.AppConfigProvider, },
    ]; };
    return PresetsTreatmentsService;
}());
exports.PresetsTreatmentsService = PresetsTreatmentsService;
//# sourceMappingURL=presets-treatments.service.js.map