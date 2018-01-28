"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_fabrics_service_1 = require("./presets-fabrics.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsFabricsComponent = /** @class */ (function () {
    function PresetsFabricsComponent(appComponent, presetsFabricsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsFabricsService = presetsFabricsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.aFabricToEdit = {};
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
        this.fetchAllFabrics();
    }
    PresetsFabricsComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myFabricForm = new forms_1.FormGroup({
            'fabricMaterialName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'fabricMaterialWeight': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'fabricMaterialType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'fabricMaterialCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])]))
        });
        this.presetsFabricsService.setActiveFabricToEdit(null);
        this.aFabricToEdit = {};
    };
    PresetsFabricsComponent.prototype.resetFabricModal = function () {
        this.myFabricForm.reset();
        this.aFabricToEdit = null;
        this.presetsFabricsService.aFabricToEdit = null;
    };
    PresetsFabricsComponent.prototype.fetchAllFabrics = function () {
        var _this = this;
        this.loading = 'getFabrics';
        this.presetsFabricsService.getAllFabrics()
            .subscribe(function (res) {
            console.log('getAllFabrics-Response', res);
            _this.fabrics = res;
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
        console.log('style', fabric);
        this.presetsFabricsService.postFabric(fabric)
            .subscribe(function (res) {
            _this.aFabricToEdit = null;
            _this.myFabricForm.reset();
            _this.myFabricForm.enable();
            console.log('postFabric-Response', res);
            _this.loading = '';
            _this.fetchAllFabrics();
            if (!_this.aFabricToEdit) {
                _this.alert.success('Fabric Created Successfully');
            }
            else {
                _this.alert.success('Fabric Updated Successfully');
            }
        }, function (err) {
            _this.myFabricForm.enable();
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
    PresetsFabricsComponent.prototype.editFabric = function (fabric) {
        console.log('editFabric', fabric);
        this.aFabricToEdit.id = fabric.id;
        this.aFabricToEdit.fabrics = {};
        this.aFabricToEdit.fabrics.fabricMaterialName = (fabric.fabricMaterialName) ? fabric.fabricMaterialName : null;
        this.aFabricToEdit.fabrics.fabricMaterialType = (fabric.fabricMaterialType) ? fabric.fabricMaterialType : null;
        this.aFabricToEdit.fabrics.fabricMaterialWeight = (fabric.fabricMaterialWeight) ? fabric.fabricMaterialWeight : null;
        this.aFabricToEdit.fabrics.fabricMaterialCode = (fabric.fabricMaterialCode) ? fabric.fabricMaterialCode : null;
        console.log('aFabricToEdit', this.aFabricToEdit);
        this.presetsFabricsService.setActiveFabricToEdit(this.aFabricToEdit);
        this.myFabricForm.setValue(this.aFabricToEdit.fabrics, { onlySelf: true });
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
        { type: presets_fabrics_service_1.PresetsFabricsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsFabricsComponent;
}());
exports.PresetsFabricsComponent = PresetsFabricsComponent;
//# sourceMappingURL=presets-fabrics.component.js.map