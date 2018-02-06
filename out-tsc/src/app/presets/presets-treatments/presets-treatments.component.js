"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_service_1 = require("./../presets.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsTreatmentsComponent = /** @class */ (function () {
    function PresetsTreatmentsComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.treatments = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedTreatmentItems = [];
        this.myBreadCrumb.crumbs = [
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.myBreadCrumb.active = 'Special Treatments';
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.treatments.res = {};
        this.treatments.validation = {};
        this.fetchAllTreatments();
        this.viewForm = false;
    }
    PresetsTreatmentsComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myTreatmentForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'treatmentName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'treatmentCost': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'treatmentDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'treatmentCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 30])]))
        });
        this.presetsService.setActiveTreatmentToEdit(null);
    };
    PresetsTreatmentsComponent.prototype.resetTreatmentModal = function () {
        this.myTreatmentForm.reset();
        this.presetsService.setActiveTreatmentToEdit(null);
        this.viewForm = true;
    };
    PresetsTreatmentsComponent.prototype.fetchAllTreatments = function () {
        var _this = this;
        this.loading = 'getTreatments';
        this.presetsService.getAllTreatments()
            .subscribe(function (res) {
            // console.log('getAllTreatments-Response',res);
            // console.log('getAllTreatments-Response',res);
            _this.treatments.res = res;
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
    PresetsTreatmentsComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedTreatmentItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsTreatmentsComponent.prototype.validateTreatmentCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('treatment', code)
            .subscribe(function (res) {
            // console.log('validateTreatmentCode', res);
            // console.log('validateTreatmentCode', res);
            _this.treatments.validation = res;
        }, function (err) {
            // console.log('validateTreatmentCode', err);
        });
        this.myTreatmentForm.controls.treatmentCode.setValue(code);
    };
    PresetsTreatmentsComponent.prototype.addTreatment = function (treatment) {
        var _this = this;
        this.myTreatmentForm.disable();
        this.loading = 'postTreatment';
        treatment.masterId = '6d314ae26b713ab7';
        // console.log('treatment', treatment);
        this.presetsService.updateTreatment(treatment)
            .subscribe(function (res) {
            _this.myTreatmentForm.reset();
            _this.viewForm = false;
            _this.myTreatmentForm.enable();
            // console.log('postTreatment-Response', res);
            // console.log('postTreatment-Response', res);
            _this.loading = '';
            _this.fetchAllTreatments();
            if (!_this.presetsService.getActiveTreatmentToEdit()) {
                _this.alert.success('Treatment ' + treatment.treatmentCode + ' Created Successfully');
            }
            else {
                _this.alert.success('Treatment ' + treatment.treatmentCode + ' Updated Successfully');
            }
        }, function (err) {
            _this.myTreatmentForm.enable();
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
            _this.loading = '';
            // Defining the Error Messages
            switch (err.status) {
                case 401:
                    _this.alert.error('Fields Required');
                    break;
                case 422:
                    _this.alert.error('Please Fill All The Required Fields');
                    break;
                default:
                    _this.alert.error('Some Error Occured');
                    break;
            }
        });
    };
    PresetsTreatmentsComponent.prototype.editTreatment = function (treatment) {
        this.viewForm = true;
        delete treatment['createdDate'];
        delete treatment['createdBy'];
        delete treatment['lastModifiedDate'];
        delete treatment['lastModifiedBy'];
        // console.log('editTreatment', treatment);
        this.presetsService.setActiveTreatmentToEdit(treatment);
        this.myTreatmentForm.setValue(treatment);
    };
    PresetsTreatmentsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-treatments',
                    templateUrl: './presets-treatments.component.html',
                    styleUrls: ['./presets-treatments.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsTreatmentsComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsTreatmentsComponent;
}());
exports.PresetsTreatmentsComponent = PresetsTreatmentsComponent;
//# sourceMappingURL=presets-treatments.component.js.map