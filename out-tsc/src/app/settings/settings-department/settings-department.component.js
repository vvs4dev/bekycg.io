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
var SettingsDepartmentComponent = /** @class */ (function () {
    function SettingsDepartmentComponent(user, router, aRoute, alert, settingsService, appComponent) {
        this.user = user;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.settingsService = settingsService;
        this.appComponent = appComponent;
        this.myBreadCrumb = [];
        this.params = {};
        this.edit = {};
        this.resDepartment = {};
        this.organisationName = { 'available': true };
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Settings", "routerLink": "/settings" },
            { "menu": this.aRoute.snapshot.paramMap.get('company'), "routerLink": "/settings" },
            { "menu": this.aRoute.snapshot.paramMap.get('branch'), "routerLink": "/Organisation" },
        ];
    }
    SettingsDepartmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrganisationBranchDepartmentForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'organisationCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'organisationId': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'branchCode': new forms_1.FormControl(''),
            'branchId': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'departmentCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'departmentName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'departmentType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])]))
        });
        this.params = {
            'company': this.aRoute.snapshot.paramMap.get('company'),
            'branch': this.aRoute.snapshot.paramMap.get('branch'),
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        console.log('this.params', this.params);
        this.settingsService.checkBranchExistance(this.params.branch)
            .subscribe(function (res) {
            console.log('checkBranchExistanceResponse', res);
            _this.params.res = res;
            if (_this.params.res.available == true) {
                _this.alert.error('No Organisation available with request Data');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }
            else if (_this.params.res.available == false) {
                if (_this.params.company != _this.params.res.organisationCode) {
                    _this.alert.error(_this.params.branch + ' is not a branch of ' + _this.params.company);
                }
                else if ((_this.params.company == _this.params.res.organisationCode)) {
                    _this.myOrganisationBranchDepartmentForm.controls['branchCode'].setValue(_this.params.res.branchCode);
                    _this.myOrganisationBranchDepartmentForm.controls['branchId'].setValue(_this.params.res.branchId);
                    _this.myOrganisationBranchDepartmentForm.controls['organisationCode'].setValue(_this.params.res.organisationCode);
                    _this.myOrganisationBranchDepartmentForm.controls['organisationId'].setValue(_this.params.res.organisationId);
                }
            }
        }, function (err) {
            console.log('checkBranchExistanceResponse', err);
        });
        if (this.params.action == 'edit') {
            this.settingsService.findDepartment(this.params.id)
                .subscribe(function (res) {
                console.log('findBranch', 'this.edit', res[0]);
                _this.edit = res[0];
                delete _this.edit['createdBy'];
                delete _this.edit['createdDate'];
                delete _this.edit['lastModifiedBy'];
                delete _this.edit['lastModifiedDate'];
                console.log('findBranch', 'after delete - this.edit', _this.edit);
                _this.myOrganisationBranchDepartmentForm.setValue(_this.edit);
            }, function (err) {
                _this.alert.error('Error Occured while Fetching Data');
            });
        }
    };
    SettingsDepartmentComponent.prototype.addDepartmentData = function (department) {
        var _this = this;
        console.log('department', department);
        this.myOrganisationBranchDepartmentForm.disable();
        this.loading = 'postDepartment';
        if (this.params.action == 'add') {
            delete department['id'];
            this.settingsService.postDepartment(department)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrganisationBranchDepartmentForm.reset();
                _this.myOrganisationBranchDepartmentForm.enable();
                console.log('addDepartmentResponse', res);
                _this.resDepartment = res;
                // this.settingsService.createImageContainer(res);
                // this.settingsService.createImageContainer(res);
                _this.alert.success(_this.resDepartment.departmentName + 'Created Successfully');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Ocuured while Creating Department');
                console.log('addDepartmentResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.settingsService.updateDepartment(department)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrganisationBranchDepartmentForm.reset();
                _this.myOrganisationBranchDepartmentForm.enable();
                console.log('putDepartmentResponse', res);
                _this.alert.success(_this.edit.departmentName + 'Updated Successfully');
                setTimeout(function () { _this.router.navigate(['/settings']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Occured while Updating ' + _this.edit.name);
                console.log('putDepartmentResponse', err);
            });
        }
    };
    SettingsDepartmentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-settings-department',
                    templateUrl: './settings-department.component.html',
                    styleUrls: ['./settings-department.component.scss']
                },] },
    ];
    /** @nocollapse */
    SettingsDepartmentComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: settings_service_1.SettingsService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return SettingsDepartmentComponent;
}());
exports.SettingsDepartmentComponent = SettingsDepartmentComponent;
//# sourceMappingURL=settings-department.component.js.map