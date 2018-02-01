"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_service_1 = require("../presets.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsAccessoriesComponent = /** @class */ (function () {
    function PresetsAccessoriesComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.accessories = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedAccessories = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Accessories', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.accessories.res = [];
        this.accessories.validation = {};
        this.fetchAllAccessories();
    }
    PresetsAccessoriesComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myAccessoryForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'accessoryName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'accessoryType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'accessoryDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'accessoryCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 30])]))
        });
    };
    PresetsAccessoriesComponent.prototype.resetAccessoryModal = function () {
        this.myAccessoryForm.reset();
        this.presetsService.setActiveAccessoryToEdit(null);
    };
    PresetsAccessoriesComponent.prototype.fetchAllAccessories = function () {
        var _this = this;
        this.loading = 'getAccessories';
        this.presetsService.getAllAccessories()
            .subscribe(function (res) {
            // console.log('getAllAccessories-Response',res);
            // console.log('getAllAccessories-Response',res);
            _this.accessories.res = res;
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
    PresetsAccessoriesComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedAccessories = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsAccessoriesComponent.prototype.validateAccessoryCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('accessory', code)
            .subscribe(function (res) {
            // console.log('validateAccessoryCode', res);
            // console.log('validateAccessoryCode', res);
            _this.accessories.validation = res;
        }, function (err) {
            // console.log('validateAccessoryCode', err);
        });
        this.myAccessoryForm.controls.accessoryCode.setValue(code);
    };
    PresetsAccessoriesComponent.prototype.addAccessory = function (accessory) {
        var _this = this;
        this.myAccessoryForm.disable();
        this.loading = 'postAccessory';
        accessory.masterId = '4070c908cc6a396c';
        // console.log('Accessory', accessory);
        this.presetsService.updateAccessory(accessory)
            .subscribe(function (res) {
            _this.myAccessoryForm.reset();
            _this.myAccessoryForm.enable();
            // console.log('updateAccessory-Response', res);
            // console.log('updateAccessory-Response', res);
            _this.loading = '';
            _this.fetchAllAccessories();
            if (!_this.presetsService.getActiveAccessoryToEdit()) {
                _this.alert.success('Accessory ' + accessory.accessoryCode + ' Created Successfully');
            }
            else {
                _this.alert.success('Accessory ' + accessory.accessoryCode + ' Updated Successfully');
            }
        }, function (err) {
            _this.myAccessoryForm.enable();
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
    PresetsAccessoriesComponent.prototype.editAccessory = function (accessory) {
        // console.log('editAccessory', accessory);
        delete accessory['createdDate'];
        delete accessory['createdBy'];
        delete accessory['lastModifiedDate'];
        delete accessory['lastModifiedBy'];
        this.presetsService.setActiveAccessoryToEdit(accessory);
        this.myAccessoryForm.setValue(accessory, { onlySelf: true });
    };
    PresetsAccessoriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-accessories',
                    templateUrl: './presets-accessories.component.html',
                    styleUrls: ['./presets-accessories.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsAccessoriesComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsAccessoriesComponent;
}());
exports.PresetsAccessoriesComponent = PresetsAccessoriesComponent;
//# sourceMappingURL=presets-accessories.component.js.map