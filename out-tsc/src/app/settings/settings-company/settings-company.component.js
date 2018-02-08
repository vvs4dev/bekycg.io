"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var user_service_1 = require("./../../_services/user.service");
var settings_service_1 = require("./../settings.service");
var SettingsCompanyComponent = /** @class */ (function () {
    function SettingsCompanyComponent(user, router, aRoute, alert, settingsService, appComponent) {
        this.user = user;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.settingsService = settingsService;
        this.appComponent = appComponent;
        this.myBreadCrumb = [];
        this.params = {};
        this.edit = {};
        this.resOrganisation = {};
        this.organisationName = { 'available': true };
        this.myBreadCrumb = [
            { 'menu': 'Home', 'routerLink': '/' },
            { 'menu': 'Settings', 'routerLink': '/Organisations' }
        ];
    }
    SettingsCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrganisationForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'code': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'name': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'logo': new forms_1.FormControl(''),
            'website': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'location': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'address': new forms_1.FormGroup({
                'po': new forms_1.FormControl(),
                'street': new forms_1.FormControl(),
                'city': new forms_1.FormControl(),
                'state': new forms_1.FormControl(),
                'pincode': new forms_1.FormControl()
            }),
        });
        this.params = {
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        console.log('this.params', this.params);
        if (this.params.action === 'edit') {
            this.settingsService.findOrganisation(this.params.id)
                .subscribe(function (res) {
                console.log('findOrganisation', 'this.edit', res[0]);
                _this.edit = res[0];
                delete _this.edit['createdBy'];
                delete _this.edit['createdDate'];
                delete _this.edit['lastModifiedBy'];
                delete _this.edit['lastModifiedDate'];
                console.log('findOrganisation', 'after delete - this.edit', _this.edit);
                _this.myOrganisationForm.setValue(_this.edit);
            }, function (err) {
                _this.alert.error('Error Occured while Fetching Data');
            });
        }
    };
    SettingsCompanyComponent.prototype.genOrganisationCode = function (name) {
        var _this = this;
        var code = name.replace(/\s\s+/g, ' ');
        code = code.replace(/\s+$/, '');
        code = code.split(' ').join('-');
        console.log('name', name, '=========  code', code);
        this.settingsService.checkOrganisationExistance(code)
            .subscribe(function (res) {
            console.log('res', res);
            _this.organisationName = res;
            console.log('this.organisationName.available', _this.organisationName.available);
            _this.myOrganisationForm.controls.code.setValue(code);
        }, function (err) {
            console.log('err', err);
        });
    };
    SettingsCompanyComponent.prototype.addOrganisationData = function (organisation) {
        var _this = this;
        console.log('organisation', organisation);
        this.myOrganisationForm.disable();
        this.loading = 'postOrganisation';
        if (this.params.action === 'add') {
            delete organisation['id'];
            this.settingsService.postOrganisation(organisation)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrganisationForm.reset();
                _this.myOrganisationForm.enable();
                console.log('addOrganisationResponse', res);
                _this.resOrganisation = res;
                // this.settingsService.createImageContainer(res);
                // this.settingsService.createImageContainer(res);
                _this.alert.success(_this.resOrganisation.name + 'Created Successfully');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Ocuured while Creating Organisation');
                console.log('addOrganisationResponse', err);
            });
        }
        else if (this.params.action === 'edit') {
            this.settingsService.updateOrganisation(organisation)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrganisationForm.reset();
                _this.myOrganisationForm.enable();
                console.log('putOrganisationResponse', res);
                _this.alert.success(_this.edit.name + 'Updated Successfully');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Occured while Updating ' + _this.edit.name);
                console.log('putOrganisationResponse', err);
            });
        }
    };
    SettingsCompanyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-settings-company',
                    templateUrl: './settings-company.component.html',
                    styleUrls: ['./settings-company.component.scss']
                },] },
    ];
    /** @nocollapse */
    SettingsCompanyComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: settings_service_1.SettingsService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return SettingsCompanyComponent;
}());
exports.SettingsCompanyComponent = SettingsCompanyComponent;
//# sourceMappingURL=settings-company.component.js.map