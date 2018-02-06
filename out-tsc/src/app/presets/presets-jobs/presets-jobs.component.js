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
var PresetsJobsComponent = /** @class */ (function () {
    function PresetsJobsComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.jobs = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedJobItems = [];
        this.myBreadCrumb.crumbs = [
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.myBreadCrumb.active = 'Jobs';
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllJobs();
        this.jobs.res = {};
        this.jobs.validation = {};
        this.viewForm = false;
    }
    PresetsJobsComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myJobForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'jobName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'jobCost': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'jobDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'jobCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 30])]))
        });
    };
    PresetsJobsComponent.prototype.resetJobModal = function () {
        this.myJobForm.reset();
        this.presetsService.setActiveJobToEdit(null);
        this.viewForm = true;
    };
    PresetsJobsComponent.prototype.fetchAllJobs = function () {
        var _this = this;
        this.loading = 'getJobs';
        this.presetsService.getAllJobs()
            .subscribe(function (res) {
            // console.log('getAllJobs-Response',res);
            // console.log('getAllJobs-Response',res);
            _this.jobs.res = res;
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
    PresetsJobsComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedJobItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsJobsComponent.prototype.validateJobCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('job', code)
            .subscribe(function (res) {
            // console.log('validateJobCode', res);
            // console.log('validateJobCode', res);
            _this.jobs.validation = res;
        }, function (err) {
            // console.log('validateJobCode', err);
        });
        this.myJobForm.controls.jobCode.setValue(code);
    };
    PresetsJobsComponent.prototype.addJob = function (job) {
        var _this = this;
        this.myJobForm.disable();
        this.loading = 'postJob';
        job.masterId = '6d314ae26b713ab7';
        // console.log('job', job);
        this.presetsService.updateJob(job)
            .subscribe(function (res) {
            _this.myJobForm.reset();
            _this.viewForm = false;
            _this.myJobForm.enable();
            // console.log('postJob-Response', res);
            // console.log('postJob-Response', res);
            _this.loading = '';
            _this.fetchAllJobs();
            if (!_this.presetsService.getActiveJobToEdit()) {
                _this.alert.success('Job ' + job.jobCode + ' Created Successfully');
            }
            else {
                _this.alert.success('Job ' + job.jobCode + ' Updated Successfully');
            }
        }, function (err) {
            _this.myJobForm.enable();
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
    PresetsJobsComponent.prototype.editJob = function (job) {
        // console.log('editJob', job);
        this.viewForm = true;
        delete job['createdDate'];
        delete job['createdBy'];
        delete job['lastModifiedDate'];
        delete job['lastModifiedBy'];
        this.presetsService.setActiveJobToEdit(job);
        this.myJobForm.setValue(job);
    };
    PresetsJobsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-jobs',
                    templateUrl: './presets-jobs.component.html',
                    styleUrls: ['./presets-jobs.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsJobsComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsJobsComponent;
}());
exports.PresetsJobsComponent = PresetsJobsComponent;
//# sourceMappingURL=presets-jobs.component.js.map