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
var SettingsBranchesComponent = /** @class */ (function () {
    function SettingsBranchesComponent(user, router, aRoute, alert, settingsService, appComponent) {
        this.user = user;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.settingsService = settingsService;
        this.appComponent = appComponent;
        this.myBreadCrumb = [];
        this.params = {};
        this.edit = {};
        this.resBranch = {};
        this.organisationBranchName = { 'available': true };
        this.myBreadCrumb = [
            { 'menu': 'Home', 'routerLink': '/' },
            { 'menu': 'Settings', 'routerLink': '/settings' },
            { 'menu': this.aRoute.snapshot.paramMap.get('company'), 'routerLink': '/Organisation' },
        ];
    }
    SettingsBranchesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrganisationBranchForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'organisationCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'organisationId': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'branchCode': new forms_1.FormControl(''),
            'branchName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'branchLocation': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'branchAddress': new forms_1.FormGroup({
                'po': new forms_1.FormControl(),
                'street': new forms_1.FormControl(),
                'city': new forms_1.FormControl(),
                'state': new forms_1.FormControl(),
                'pincode': new forms_1.FormControl()
            }),
        });
        this.params = {
            'company': this.aRoute.snapshot.paramMap.get('company'),
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        console.log('this.params', this.params);
        this.settingsService.checkOrganisationExistance(this.params.company)
            .subscribe(function (res) {
            console.log('checkOrganisationExistanceResponse', res);
            _this.params.res = res;
            if (_this.params.res.available === true) {
                _this.alert.error('No Organisation available with request Data');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }
            else if (_this.params.res.available === false) {
                _this.myOrganisationBranchForm.controls['organisationCode'].setValue(_this.params.company);
                _this.myOrganisationBranchForm.controls['organisationId'].setValue(_this.params.res.id);
            }
        }, function (err) {
            console.log('checkOrganisationExistanceResponse', err);
        });
        if (this.params.action === 'edit') {
            this.settingsService.findBranch(this.params.id)
                .subscribe(function (res) {
                console.log('findBranch', 'this.edit', res[0]);
                _this.edit = res[0];
                delete _this.edit['createdBy'];
                delete _this.edit['createdDate'];
                delete _this.edit['lastModifiedBy'];
                delete _this.edit['lastModifiedDate'];
                console.log('findBranch', 'after delete - this.edit', _this.edit);
                _this.myOrganisationBranchForm.setValue(_this.edit);
            }, function (err) {
                _this.alert.error('Error Occured while Fetching Data');
            });
        }
    };
    SettingsBranchesComponent.prototype.genBranchCode = function (name) {
        var _this = this;
        var code = name.replace(/\s\s+/g, ' ');
        code = code.replace(/\s+$/, '');
        code = code.split(' ').join('-');
        console.log('name', name, '=========  code', code);
        this.settingsService.checkBranchExistance(code)
            .subscribe(function (res) {
            console.log('res', res);
            _this.organisationBranchName = res;
            console.log('this.organisationBranchName.available', _this.organisationBranchName.available);
            _this.myOrganisationBranchForm.controls.branchCode.setValue(code);
        }, function (err) {
            console.log('err', err);
        });
    };
    SettingsBranchesComponent.prototype.addBranchData = function (branch) {
        var _this = this;
        console.log('branch', branch);
        this.myOrganisationBranchForm.disable();
        this.loading = 'postBranch';
        if (this.params.action === 'add') {
            delete branch['id'];
            this.settingsService.postBranch(branch)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrganisationBranchForm.reset();
                _this.myOrganisationBranchForm.enable();
                console.log('addBranchResponse', res);
                _this.resBranch = res;
                // this.settingsService.createImageContainer(res);
                // this.settingsService.createImageContainer(res);
                _this.alert.success(_this.resBranch.branchName + 'Created Successfully');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Ocuured while Creating Branch');
                console.log('addBranchResponse', err);
            });
        }
        else if (this.params.action === 'edit') {
            this.settingsService.updateBranch(branch)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrganisationBranchForm.reset();
                _this.myOrganisationBranchForm.enable();
                console.log('putBranchResponse', res);
                _this.alert.success(_this.edit.branchName + ' Updated Successfully');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Occured while Updating ' + _this.edit.branchName);
                console.log('putBranchResponse', err);
            });
        }
    };
    SettingsBranchesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-settings-branches',
                    templateUrl: './settings-branches.component.html',
                    styleUrls: ['./settings-branches.component.scss']
                },] },
    ];
    /** @nocollapse */
    SettingsBranchesComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: settings_service_1.SettingsService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return SettingsBranchesComponent;
}());
exports.SettingsBranchesComponent = SettingsBranchesComponent;
//# sourceMappingURL=settings-branches.component.js.map