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
var PresetsPackersComponent = /** @class */ (function () {
    function PresetsPackersComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.packers = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedPackerItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Packing Materials', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllPackers();
        this.packers.res = [];
        this.packers.validation = {};
    }
    PresetsPackersComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myPackerForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'packerName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'packerType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'packerDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'packerCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 30])]))
        });
    };
    PresetsPackersComponent.prototype.resetPackerModal = function () {
        this.myPackerForm.reset();
        this.presetsService.setActivePackerToEdit(null);
    };
    PresetsPackersComponent.prototype.validatePackerCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('packer', code)
            .subscribe(function (res) {
            // console.log('validatePackerCode', res);
            // console.log('validatePackerCode', res);
            _this.packers.validation = res;
        }, function (err) {
            // console.log('validatePackerCode', err);
        });
        this.myPackerForm.controls.packerCode.setValue(code);
    };
    PresetsPackersComponent.prototype.fetchAllPackers = function () {
        var _this = this;
        this.loading = 'getPackers';
        this.presetsService.getAllPackers()
            .subscribe(function (res) {
            // console.log('getAllPackers-Response',res);
            // console.log('getAllPackers-Response',res);
            _this.packers.res = res;
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
    PresetsPackersComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedPackerItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsPackersComponent.prototype.addPacker = function (packer) {
        var _this = this;
        this.myPackerForm.disable();
        this.loading = 'postPacker';
        packer.masterId = '4070c908cc6a396c';
        // console.log('packer', packer);
        this.presetsService.updatePacker(packer)
            .subscribe(function (res) {
            _this.myPackerForm.reset();
            _this.myPackerForm.enable();
            // console.log('updatePacker-Response', res);
            // console.log('updatePacker-Response', res);
            _this.loading = '';
            _this.fetchAllPackers();
            if (!_this.presetsService.getActivePackerToEdit()) {
                _this.alert.success('Packer ' + packer.packerCode + ' Created Successfully');
            }
            else {
                _this.alert.success('Packer ' + packer.packerCode + ' Updated Successfully');
            }
        }, function (err) {
            _this.myPackerForm.enable();
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
    PresetsPackersComponent.prototype.editPacker = function (packer) {
        // console.log('editPacker', packer);
        delete packer['createdDate'];
        delete packer['createdBy'];
        delete packer['lastModifiedDate'];
        delete packer['lastModifiedBy'];
        this.presetsService.setActivePackerToEdit(packer);
        this.myPackerForm.setValue(packer);
    };
    PresetsPackersComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-packers',
                    templateUrl: './presets-packers.component.html',
                    styleUrls: ['./presets-packers.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsPackersComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsPackersComponent;
}());
exports.PresetsPackersComponent = PresetsPackersComponent;
//# sourceMappingURL=presets-packers.component.js.map