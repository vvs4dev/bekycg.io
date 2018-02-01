"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../../_services/alert.service");
var user_service_1 = require("./../../../_services/user.service");
var presets_service_1 = require("./../../presets.service");
var PresetsVendorContactsFormComponent = /** @class */ (function () {
    function PresetsVendorContactsFormComponent(appComponent, router, aRoute, user, alert, presetsService) {
        this.appComponent = appComponent;
        this.router = router;
        this.aRoute = aRoute;
        this.user = user;
        this.alert = alert;
        this.presetsService = presetsService;
        this.myBreadCrumb = {};
        this.aVendor = {};
        this.aVendorContact = {};
        this.aVendorContactToEdit = {};
        this.aVendor = this.presetsService.getActiveVendor();
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" },
            { "menu": "Vendor", "routerLink": "/presets/vendors" },
            { "menu": this.aVendor.vendorCode, "routerLink": "/presets/vendors" },
        ];
        this.appComponent.setActiveBreadcrumb('Add Vendor Contact', this.myBreadCrumb);
        // console.log('this.aVendor',this.aVendor)
        // if (this.validateVendor != this.aVendor.brandCode) {
        //   this.alert.error('Sorry for inconvenience, We are stopping Malicious Action Occured, Please try again');
        // }
    }
    PresetsVendorContactsFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.aRoute.params.subscribe(function (params) {
            return _this.validateVendor = params['code'];
        });
        // Form Settings
        this.myVendorContactForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'vendorId': new forms_1.FormControl(''),
            'vendorCode': new forms_1.FormControl(''),
            'contactName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 50])])),
            'contactEmail': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 50]), ng4_validators_1.CustomValidators.email])),
            'contactNumber': new forms_1.FormArray([this.buildContactNumberComponent()]),
            'location': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([2, 40])])),
            'address': new forms_1.FormGroup({
                'PO': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([1, 20])])),
                'street': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'city': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'state': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'zipcode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.number, ng4_validators_1.CustomValidators.rangeLength([6, 12])]))
            })
        });
        this.myVendorContactForm.controls.vendorId.setValue(this.aVendor.id);
        this.myVendorContactForm.controls.vendorCode.setValue(this.aVendor.vendorCode);
        if (this.presetsService.getActiveVendorContactToEdit()) {
            this.myVendorContactForm.setValue(this.presetsService.getActiveVendorContactToEdit());
        }
    };
    PresetsVendorContactsFormComponent.prototype.buildContactNumberComponent = function () {
        return new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]));
    };
    PresetsVendorContactsFormComponent.prototype.addVendorContact = function (vendorContact) {
        var _this = this;
        this.myVendorContactForm.disable();
        this.loading = 'postVendorContact';
        // console.log('vendorContact', vendorContact);
        this.presetsService.postVendorContact(this.aVendor.id, vendorContact)
            .subscribe(function (res) {
            _this.myVendorContactForm.reset();
            _this.myVendorContactForm.enable();
            // console.log('postVendorContact-Response', res);
            // console.log('postVendorContact-Response', res);
            _this.loading = '';
            _this.alert.success('VendorContact Successfully added to Vendor, You will be redirected to Vendors');
            _this.presetsService.setActiveVendor(res);
            setTimeout(function () { _this.router.navigate(['/presets/vendors']); }, 4000);
        }, function (err) {
            _this.myVendorContactForm.enable();
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
    PresetsVendorContactsFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-vendor-contacts-form',
                    templateUrl: './presets-vendor-contacts-form.component.html',
                    styleUrls: ['./presets-vendor-contacts-form.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsVendorContactsFormComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: user_service_1.UserService, },
        { type: alert_service_1.AlertService, },
        { type: presets_service_1.PresetsService, },
    ]; };
    return PresetsVendorContactsFormComponent;
}());
exports.PresetsVendorContactsFormComponent = PresetsVendorContactsFormComponent;
//# sourceMappingURL=presets-vendor-contacts-form.component.js.map