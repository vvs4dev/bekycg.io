"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../../_services/alert.service");
var user_service_1 = require("./../../../_services/user.service");
var presets_vendors_service_1 = require("./../presets-vendors.service");
var PresetsVendorsFormComponent = /** @class */ (function () {
    function PresetsVendorsFormComponent(appComponent, router, user, alert, presetsVendorsService) {
        this.appComponent = appComponent;
        this.router = router;
        this.user = user;
        this.alert = alert;
        this.presetsVendorsService = presetsVendorsService;
        this.myBreadCrumb = {};
        this.aVendor = {};
        this.aVendorToEdit = {};
        this.formConfig = {};
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" },
            { "menu": "Vendors", "routerLink": "/presets/vendors" }
        ];
        this.appComponent.setActiveBreadcrumb('Add Vendors', this.myBreadCrumb);
    }
    PresetsVendorsFormComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myVendorForm = new forms_1.FormGroup({
            'vendorCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'vendorName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])]))
        });
        this.aVendorToEdit = this.presetsVendorsService.getActiveVendorToEdit();
        if (this.aVendorToEdit) {
            console.log('intiatedEdit');
            this.aVendor.vendorCode = this.aVendorToEdit.vendorCode;
            this.aVendor.vendorName = this.aVendorToEdit.vendorName;
            this.myVendorForm.setValue(this.aVendor, { onlySelf: true });
        }
        // const Vendor = {
        //   vendorCode : 'asdgasdgadsgadsgad',
        //   vendorName : 'asdgasdgadsgadsgad'
        // };
        // this.myVendorForm.setValue(Vendor, {onlySelf: true});
    };
    PresetsVendorsFormComponent.prototype.addVendor = function (vendor) {
        var _this = this;
        this.myVendorForm.disable();
        this.loading = 'postVendor';
        console.log('Vendor', vendor);
        this.presetsVendorsService.postVendor(vendor)
            .subscribe(function (res) {
            _this.myVendorForm.reset();
            _this.myVendorForm.enable();
            console.log('postVendor-Response', res);
            _this.loading = '';
            _this.presetsVendorsService.setActiveVendor(res);
            if (!_this.aVendorToEdit) {
                _this.alert.success('Vendor Created Successfully, You will be redirected to add Vendor contact');
                setTimeout(function () { _this.router.navigate(['/presets/vendor/' + vendor.vendorCode + '/contacts/form']); }, 4000);
            }
            else {
                _this.alert.success('Vendor Created Successfully, You will be redirected to vendors');
                setTimeout(function () { _this.router.navigate(['/presets/vendors']); }, 4000);
            }
        }, function (err) {
            _this.myVendorForm.enable();
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
    PresetsVendorsFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-vendors-form',
                    templateUrl: './presets-vendors-form.component.html',
                    styleUrls: ['./presets-vendors-form.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsVendorsFormComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: router_1.Router, },
        { type: user_service_1.UserService, },
        { type: alert_service_1.AlertService, },
        { type: presets_vendors_service_1.PresetsVendorsService, },
    ]; };
    return PresetsVendorsFormComponent;
}());
exports.PresetsVendorsFormComponent = PresetsVendorsFormComponent;
//# sourceMappingURL=presets-vendors-form.component.js.map