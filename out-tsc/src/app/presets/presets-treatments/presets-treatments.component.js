"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_treatments_service_1 = require("./presets-treatments.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsTreatmentsComponent = /** @class */ (function () {
    function PresetsTreatmentsComponent(appComponent, presetsTreatmentsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsTreatmentsService = presetsTreatmentsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.aTreatmentToEdit = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedTreatmentItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Special Treatments', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllTreatments();
    }
    PresetsTreatmentsComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myTreatmentForm = new forms_1.FormGroup({
            'specialTreatmentName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'specialTreatmentCost': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'specialTreatmentDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'specialTreatmentCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 30])]))
        });
        // this.presetsTreatmentsService.setActiveTreatmentToEdit(null);
        // this.aTreatmentToEdit = {};
    };
    PresetsTreatmentsComponent.prototype.resetTreatmentModal = function () {
        this.myTreatmentForm.reset();
        this.presetsTreatmentsService.setActiveTreatmentToEdit(null);
        this.aTreatmentToEdit = null;
    };
    PresetsTreatmentsComponent.prototype.fetchAllTreatments = function () {
        var _this = this;
        this.loading = 'getTreatments';
        this.presetsTreatmentsService.getAllTreatments()
            .subscribe(function (res) {
            console.log('getAllTreatments-Response', res);
            _this.treatments = res;
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
    PresetsTreatmentsComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedTreatmentItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsTreatmentsComponent.prototype.addTreatment = function (treatment) {
        var _this = this;
        this.myTreatmentForm.disable();
        this.loading = 'postTreatment';
        console.log('style', treatment);
        this.presetsTreatmentsService.postTreatment(treatment)
            .subscribe(function (res) {
            _this.aTreatmentToEdit = null;
            _this.myTreatmentForm.reset();
            _this.myTreatmentForm.enable();
            console.log('postTreatment-Response', res);
            _this.loading = '';
            _this.fetchAllTreatments();
            if (!_this.aTreatmentToEdit) {
                _this.alert.success('Treatment Created Successfully');
            }
            else {
                _this.alert.success('Treatment Updated Successfully');
            }
        }, function (err) {
            _this.myTreatmentForm.enable();
            _this.loading = false;
            console.log('err', err);
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
        console.log('editTreatment', treatment);
        this.aTreatmentToEdit = {};
        this.aTreatmentToEdit.id = treatment.id;
        this.aTreatmentToEdit.treatments = {};
        this.aTreatmentToEdit.treatments.specialTreatmentName = (treatment.specialTreatmentName) ? treatment.specialTreatmentName : null;
        this.aTreatmentToEdit.treatments.specialTreatmentCost = (treatment.specialTreatmentCost) ? treatment.specialTreatmentCost : null;
        this.aTreatmentToEdit.treatments.specialTreatmentDescription = (treatment.specialTreatmentDescription) ? treatment.specialTreatmentDescription : null;
        this.aTreatmentToEdit.treatments.specialTreatmentCode = (treatment.specialTreatmentCode) ? treatment.specialTreatmentCode : null;
        console.log('aTreatmentToEdit', this.aTreatmentToEdit);
        this.presetsTreatmentsService.setActiveTreatmentToEdit(this.aTreatmentToEdit);
        this.myTreatmentForm.setValue(this.aTreatmentToEdit.treatments, { onlySelf: true });
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
        { type: presets_treatments_service_1.PresetsTreatmentsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsTreatmentsComponent;
}());
exports.PresetsTreatmentsComponent = PresetsTreatmentsComponent;
//# sourceMappingURL=presets-treatments.component.js.map