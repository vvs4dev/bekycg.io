"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../../_services/alert.service");
var user_service_1 = require("./../../../_services/user.service");
var presets_service_1 = require("../../presets.service");
var PresetsVendorsFormComponent = /** @class */ (function () {
    function PresetsVendorsFormComponent(appComponent, router, aRoute, user, alert, presetsService) {
        this.appComponent = appComponent;
        this.router = router;
        this.aRoute = aRoute;
        this.user = user;
        this.alert = alert;
        this.presetsService = presetsService;
        this.myBreadCrumb = {};
        this.aVendor = {};
        this.aVendorToEdit = {};
        this.formConfig = {};
        this.params = {};
        this.myBreadCrumb.crumbs = [
            { 'menu': 'Presets', 'routerLink': '/presets' },
            { 'menu': 'Vendors', 'routerLink': '/presets/vendors' }
        ];
        this.myBreadCrumb.active = (this.aRoute.snapshot.paramMap.get('action') === 'add') ? 'Add Vendor' : 'Edit ' + this.aRoute.snapshot.paramMap.get('id');
    }
    PresetsVendorsFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myVendorForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'vendorCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'vendorName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])]))
        });
        this.params = {
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        this.aVendor.validation = {};
        switch (this.params.action) {
            case 'edit':
                // console.log('intiatedEdit');
                this.presetsService.getMaster('vendor', this.params.id)
                    .subscribe(function (res) {
                    // console.log('getMasterBuyer', res);
                    delete res['createdDate'];
                    delete res['createdBy'];
                    delete res['lastModifiedDate'];
                    delete res['lastModifiedBy'];
                    _this.myVendorForm.setValue(res);
                }, function (err) {
                    // console.log('getMasterVendor', err);
                });
                break;
            case 'add':
                // console.log('add')
                break;
            default:
                this.router.navigate(['/']);
                break;
        }
    };
    PresetsVendorsFormComponent.prototype.validateVendorCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('vendor', code)
            .subscribe(function (res) {
            // console.log('validateVendorCode', res);
            // console.log('validateVendorCode', res);
            _this.aVendor.validation = res;
        }, function (err) {
            // console.log('validateVendorCode', err);
        });
        this.myVendorForm.controls.vendorCode.setValue(code);
    };
    PresetsVendorsFormComponent.prototype.addVendor = function (vendor) {
        var _this = this;
        this.myVendorForm.disable();
        this.loading = 'postVendor';
        vendor.masterId = '8e453c736abd6823';
        // console.log('Vendor', vendor);
        this.presetsService.updateVendor(this.params.action, vendor)
            .subscribe(function (res) {
            _this.myVendorForm.reset();
            _this.myVendorForm.enable();
            // console.log('postVendor-Response', res);
            // console.log('postVendor-Response', res);
            _this.loading = '';
            _this.presetsService.setActiveVendor(res);
            if (_this.params.action === 'add') {
                _this.alert.success('Vendor Created Successfully, You will be redirected to add Vendor contact');
                setTimeout(function () { _this.router.navigate(['/presets/vendor/' + vendor.vendorCode + '/contact/add/new']); }, 4000);
            }
            else if (_this.params.action === 'edit') {
                _this.alert.success('Vendor Updated Successfully, You will be redirected to vendors');
                setTimeout(function () { _this.router.navigate(['/presets/vendors']); }, 4000);
            }
        }, function (err) {
            _this.myVendorForm.enable();
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
        { type: router_1.ActivatedRoute, },
        { type: user_service_1.UserService, },
        { type: alert_service_1.AlertService, },
        { type: presets_service_1.PresetsService, },
    ]; };
    return PresetsVendorsFormComponent;
}());
exports.PresetsVendorsFormComponent = PresetsVendorsFormComponent;
//# sourceMappingURL=presets-vendors-form.component.js.map