"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var my_custom_validators_1 = require("./../../_directives/validators/my-custom.validators");
var alert_service_1 = require("./../../_services/alert.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var user_service_1 = require("../../_services/user.service");
var auth_service_1 = require("../../_services/auth.service");
var app_component_1 = require("../../app.component");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, user, authService, aRoute, alert, appComponent) {
        this.router = router;
        this.user = user;
        this.authService = authService;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        // Set the Screen
        this.appComponent.disableDashElements();
        // Initaite the Form
        this.myRegisterForm = new forms_1.FormGroup({
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'birthYear': new forms_1.FormControl('', [forms_1.Validators.required, my_custom_validators_1.MyCustomValidators.birthYear]),
            'email': new forms_1.FormControl(),
            'phoneNumbers': new forms_1.FormArray([this.buildPhoneNumberComponent()]),
            'location': new forms_1.FormGroup({
                'country': new forms_1.FormControl(),
                'city': new forms_1.FormControl()
            }),
            'password': new forms_1.FormControl()
        });
    };
    RegisterComponent.prototype.register = function (registerModal) {
        this.loading = true;
    };
    RegisterComponent.prototype.buildPhoneNumberComponent = function () {
        return new forms_1.FormControl('', [forms_1.Validators.required, my_custom_validators_1.MyCustomValidators.telephoneNumber]);
    };
    RegisterComponent.prototype.remove = function (i) {
        this.myRegisterForm.get('phoneNumbers').removeAt(i);
    };
    RegisterComponent.prototype.add = function () {
        this.myRegisterForm.get('phoneNumbers').push(new forms_1.FormControl(''));
    };
    RegisterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-register',
                    templateUrl: './register.component.html',
                    styleUrls: ['./register.component.scss']
                },] },
    ];
    /** @nocollapse */
    RegisterComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: user_service_1.UserService, },
        { type: auth_service_1.AuthService, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map