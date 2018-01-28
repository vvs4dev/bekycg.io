"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../../_services/alert.service");
var user_service_1 = require("./../../../_services/user.service");
var presets_buyer_service_1 = require("./../presets-buyer.service");
var PresetsBuyerContactsFormComponent = /** @class */ (function () {
    function PresetsBuyerContactsFormComponent(appComponent, router, aRoute, user, alert, presetsBuyerService) {
        this.appComponent = appComponent;
        this.router = router;
        this.aRoute = aRoute;
        this.user = user;
        this.alert = alert;
        this.presetsBuyerService = presetsBuyerService;
        this.myBreadCrumb = {};
        this.aBuyer = {};
        this.aBuyerContact = {};
        this.aBuyerContactToEdit = {};
        this.aBuyer = this.presetsBuyerService.getActiveBuyer();
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" },
            { "menu": "Buyer", "routerLink": "/presets/buyers" },
            { "menu": this.aBuyer.brandCode, "routerLink": "/presets/buyers" },
        ];
        this.appComponent.setActiveBreadcrumb('Add Buyer Contact', this.myBreadCrumb);
        console.log('this.aBuyer', this.aBuyer);
        // if (this.validateBuyer != this.aBuyer.brandCode) {
        //   this.alert.error('Sorry for inconvenience, We are stopping Malicious Action Occured, Please try again');
        // }
    }
    PresetsBuyerContactsFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.aRoute.params.subscribe(function (params) {
            return _this.validateBuyer = params['code'];
        });
        // Form Settings
        this.myBuyerContactForm = new forms_1.FormGroup({
            'contactName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 50])])),
            'contactEmail': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 50]), ng4_validators_1.CustomValidators.email])),
            'contactNumber': new forms_1.FormArray([this.buildContactNumberComponent()]),
            'location': new forms_1.FormGroup({
                'country': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'PO': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([1, 20])])),
                'street': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'city': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'state': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([4, 40])])),
                'zipcode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.number, ng4_validators_1.CustomValidators.rangeLength([6, 12])]))
            })
        });
        this.aBuyerContactToEdit = this.presetsBuyerService.getActiveBuyerContactToEdit();
        console.log('this.aBuyerContactToEdit', this.aBuyerContactToEdit);
        if (this.aBuyerContactToEdit) {
            console.log('intiatedEdit', 'this.aBuyerContactToEdit', this.aBuyerContactToEdit);
            this.aBuyerContact.contactName = this.aBuyerContactToEdit.contactName;
            this.aBuyerContact.contactEmail = this.aBuyerContactToEdit.contactEmail;
            this.aBuyerContact.contactNumber = this.aBuyerContactToEdit.contactNumber;
            this.aBuyerContact.location = this.aBuyerContactToEdit.location;
            this.myBuyerContactForm.setValue(this.aBuyerContact, { onlySelf: true });
        }
    };
    PresetsBuyerContactsFormComponent.prototype.buildContactNumberComponent = function () {
        return new forms_1.FormControl('', [forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([10, 10]), ng4_validators_1.CustomValidators.number]);
    };
    PresetsBuyerContactsFormComponent.prototype.addBuyerContact = function (buyerContact) {
        var _this = this;
        this.myBuyerContactForm.disable();
        this.loading = 'postBuyerContact';
        console.log('buyerContact', buyerContact);
        this.presetsBuyerService.postBuyerContact(this.aBuyer.id, buyerContact)
            .subscribe(function (res) {
            _this.myBuyerContactForm.reset();
            _this.myBuyerContactForm.enable();
            console.log('postBuyerContact-Response', res);
            _this.loading = '';
            _this.alert.success('BuyerContact Successfully added to Buyer, You will be buyers');
            _this.presetsBuyerService.setActiveBuyer(res);
            setTimeout(function () { _this.router.navigate(['/presets/buyers']); }, 4000);
        }, function (err) {
            _this.myBuyerContactForm.enable();
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
    PresetsBuyerContactsFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-buyer-contacts-form',
                    templateUrl: './presets-buyer-contacts-form.component.html',
                    styleUrls: ['./presets-buyer-contacts-form.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsBuyerContactsFormComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: user_service_1.UserService, },
        { type: alert_service_1.AlertService, },
        { type: presets_buyer_service_1.PresetsBuyerService, },
    ]; };
    return PresetsBuyerContactsFormComponent;
}());
exports.PresetsBuyerContactsFormComponent = PresetsBuyerContactsFormComponent;
//# sourceMappingURL=presets-buyer-contacts-form.component.js.map