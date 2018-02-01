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
var PresetsBuyersFormComponent = /** @class */ (function () {
    function PresetsBuyersFormComponent(appComponent, router, aRoute, user, alert, presetsService) {
        this.appComponent = appComponent;
        this.router = router;
        this.aRoute = aRoute;
        this.user = user;
        this.alert = alert;
        this.presetsService = presetsService;
        this.myBreadCrumb = {};
        this.aBuyer = {};
        this.params = {};
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" },
            { "menu": "Buyers", "routerLink": "/presets/buyers" }
        ];
        this.appComponent.setActiveBreadcrumb('Add Buyers', this.myBreadCrumb);
    }
    PresetsBuyersFormComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myBuyerForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'buyerCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'buyerName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])]))
        });
        this.params = {
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        this.aBuyer.validation = {};
        if (this.presetsService.getActiveBuyerToEdit()) {
            // console.log('intiatedEdit');
            this.myBuyerForm.setValue(this.presetsService.getActiveBuyerToEdit());
        }
    };
    PresetsBuyersFormComponent.prototype.validateBuyerCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('buyer', code)
            .subscribe(function (res) {
            // console.log('validateBuyerCode', res);
            // console.log('validateBuyerCode', res);
            _this.aBuyer.validation = res;
        }, function (err) {
            // console.log('validateBuyerCode', err);
        });
        this.myBuyerForm.controls.buyerCode.setValue(code);
    };
    PresetsBuyersFormComponent.prototype.addBuyer = function (buyer) {
        var _this = this;
        this.myBuyerForm.disable();
        this.loading = 'postBuyer';
        buyer.masterId = '8e453c736abd6823';
        // console.log('buyer', buyer);
        this.presetsService.updateBuyer(buyer)
            .subscribe(function (res) {
            _this.myBuyerForm.reset();
            _this.myBuyerForm.enable();
            // console.log('postBuyer-Response', res);
            // console.log('postBuyer-Response', res);
            _this.loading = '';
            _this.presetsService.setActiveBuyer(res);
            if (!_this.presetsService.getActiveBuyerToEdit()) {
                _this.alert.success('Buyer Created Successfully, You will be redirected to add buyer contact');
                setTimeout(function () { _this.router.navigate(['/presets/buyer/' + buyer.buyerCode + '/contacts/form']); }, 4000);
            }
            else {
                _this.alert.success('Buyer Updated Successfully, You will be redirected to buyers');
                setTimeout(function () { _this.router.navigate(['/presets/buyers']); }, 4000);
            }
        }, function (err) {
            _this.myBuyerForm.enable();
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
    PresetsBuyersFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-buyers-form',
                    templateUrl: './presets-buyers-form.component.html',
                    styleUrls: ['./presets-buyers-form.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsBuyersFormComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: user_service_1.UserService, },
        { type: alert_service_1.AlertService, },
        { type: presets_service_1.PresetsService, },
    ]; };
    return PresetsBuyersFormComponent;
}());
exports.PresetsBuyersFormComponent = PresetsBuyersFormComponent;
//# sourceMappingURL=presets-buyers-form.component.js.map