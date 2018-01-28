"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_job_works_service_1 = require("./presets-job-works.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsJobWorksComponent = /** @class */ (function () {
    function PresetsJobWorksComponent(appComponent, presetsJobWorksService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsJobWorksService = presetsJobWorksService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.aJobworkToEdit = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedJobworksItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Job Works', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllJobworks();
    }
    PresetsJobWorksComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myJobWorkForm = new forms_1.FormGroup({
            'jobworkName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'jobworkRate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'jobworkDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'jobworkCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 30])]))
        });
    };
    PresetsJobWorksComponent.prototype.resetJobworkModal = function () {
        this.myJobWorkForm.reset();
        this.presetsJobWorksService.setActiveJobworkToEdit(null);
        this.aJobworkToEdit = null;
    };
    PresetsJobWorksComponent.prototype.fetchAllJobworks = function () {
        var _this = this;
        this.loading = 'getJobworks';
        this.presetsJobWorksService.getAllJobworks()
            .subscribe(function (res) {
            console.log('getAllJobworks-Response', res);
            _this.jobworks = res;
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
    PresetsJobWorksComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedJobworksItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsJobWorksComponent.prototype.addJobwork = function (jobwork) {
        var _this = this;
        this.myJobWorkForm.disable();
        this.loading = 'postJobwork';
        console.log('jobwork', jobwork);
        this.presetsJobWorksService.postJobwork(jobwork)
            .subscribe(function (res) {
            _this.aJobworkToEdit = null;
            _this.myJobWorkForm.reset();
            _this.myJobWorkForm.enable();
            console.log('postJobwork-Response', res);
            _this.loading = '';
            _this.fetchAllJobworks();
            if (!_this.aJobworkToEdit) {
                _this.alert.success('Jobwork Created Successfully');
            }
            else {
                _this.alert.success('Jobwork Updated Successfully');
            }
        }, function (err) {
            _this.myJobWorkForm.enable();
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
    PresetsJobWorksComponent.prototype.editJobwork = function (jobwork) {
        console.log('editJobwork', jobwork);
        this.aJobworkToEdit = {};
        this.aJobworkToEdit.id = jobwork.id;
        this.aJobworkToEdit.jobworks = {};
        this.aJobworkToEdit.jobworks.jobworkName = (jobwork.jobworkName) ? jobwork.jobworkName : null;
        this.aJobworkToEdit.jobworks.jobworkRate = (jobwork.jobworkRate) ? jobwork.jobworkRate : null;
        this.aJobworkToEdit.jobworks.jobworkDescription = (jobwork.jobworkDescription) ? jobwork.jobworkDescription : null;
        this.aJobworkToEdit.jobworks.jobworkCode = (jobwork.jobworkCode) ? jobwork.jobworkCode : null;
        console.log('aJobworkToEdit', this.aJobworkToEdit);
        this.presetsJobWorksService.setActiveJobworkToEdit(this.aJobworkToEdit);
        this.myJobWorkForm.setValue(this.aJobworkToEdit.jobworks, { onlySelf: true });
    };
    PresetsJobWorksComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-job-works',
                    templateUrl: './presets-job-works.component.html',
                    styleUrls: ['./presets-job-works.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsJobWorksComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_job_works_service_1.PresetsJobWorksService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsJobWorksComponent;
}());
exports.PresetsJobWorksComponent = PresetsJobWorksComponent;
//# sourceMappingURL=presets-job-works.component.js.map