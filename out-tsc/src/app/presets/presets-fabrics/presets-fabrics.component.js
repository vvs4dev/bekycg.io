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
var PresetsFabricsComponent = /** @class */ (function () {
    function PresetsFabricsComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.fabrics = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedFabricItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Fabrics', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fabrics.res = {};
        this.fabrics.validation = {};
        this.fetchAllFabrics();
    }
    PresetsFabricsComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myFabricForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'fabricName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 50])])),
            'fabricWeight': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'fabricType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'fabricCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 30])]))
        });
        this.presetsService.setActiveFabricToEdit(null);
    };
    PresetsFabricsComponent.prototype.resetFabricModal = function () {
        this.myFabricForm.reset();
        this.presetsService.aFabricToEdit = null;
    };
    PresetsFabricsComponent.prototype.validateFabricCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('fabric', code)
            .subscribe(function (res) {
            // console.log('validateFabricCode', res);
            // console.log('validateFabricCode', res);
            _this.fabrics.validation = res;
        }, function (err) {
            // console.log('validateFabricCode', err);
        });
        this.myFabricForm.controls.fabricCode.setValue(code);
    };
    PresetsFabricsComponent.prototype.fetchAllFabrics = function () {
        var _this = this;
        this.loading = 'getFabrics';
        this.presetsService.getAllFabrics()
            .subscribe(function (res) {
            // console.log('getAllFabrics-Response',res);
            // console.log('getAllFabrics-Response',res);
            _this.fabrics.res = res;
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
    PresetsFabricsComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedFabricItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsFabricsComponent.prototype.addFabric = function (fabric) {
        var _this = this;
        this.myFabricForm.disable();
        this.loading = 'postFabric';
        fabric.masterId = '4070c908cc6a396c';
        // console.log('fabric', fabric);
        this.presetsService.updateFabric(fabric)
            .subscribe(function (res) {
            _this.myFabricForm.reset();
            _this.myFabricForm.enable();
            // console.log('postFabric-Response', res);
            // console.log('postFabric-Response', res);
            _this.loading = '';
            _this.fetchAllFabrics();
            if (!_this.presetsService.getActiveFabricToEdit()) {
                _this.alert.success('Fabric ' + fabric.fabricCode + ' Created Successfully');
            }
            else {
                _this.alert.success('Fabric ' + fabric.fabricCode + ' Updated Successfully');
            }
        }, function (err) {
            _this.myFabricForm.enable();
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
    PresetsFabricsComponent.prototype.editFabric = function (fabric) {
        // console.log('editFabric', fabric);
        delete fabric['createdDate'];
        delete fabric['createdBy'];
        delete fabric['lastModifiedDate'];
        delete fabric['lastModifiedBy'];
        this.presetsService.setActiveFabricToEdit(fabric);
        this.myFabricForm.setValue(fabric);
    };
    PresetsFabricsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-fabrics',
                    templateUrl: './presets-fabrics.component.html',
                    styleUrls: ['./presets-fabrics.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsFabricsComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsFabricsComponent;
}());
exports.PresetsFabricsComponent = PresetsFabricsComponent;
//# sourceMappingURL=presets-fabrics.component.js.map