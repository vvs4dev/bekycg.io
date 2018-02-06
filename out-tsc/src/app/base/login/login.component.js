"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var alert_service_1 = require("./../../_services/alert.service");
var user_service_1 = require("./../../_services/user.service");
var auth_service_1 = require("./../../_services/auth.service");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, user, authService, aRoute, alert, appComponent) {
        this.router = router;
        this.user = user;
        this.authService = authService;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.loading = false;
        this.ifAnyActiveUser = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myLoginForm = new forms_1.FormGroup({
            'username': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 50]), ng4_validators_1.CustomValidators.email])),
            'password': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])]))
        });
        // reset login status
        if (localStorage.getItem('userConfig')) {
            this.ifAnyActiveUser = JSON.parse(localStorage.getItem('userConfig'));
            console.log('localStorage.getItem(userConfig)', this.ifAnyActiveUser);
            this.authService.logout(this.ifAnyActiveUser.id);
        }
        // get return url from route parameters or default to '/'
        this.returnUrl = this.aRoute.snapshot.queryParams['returnUrl'] || '/';
        console.log('returnUrl', this.returnUrl);
    };
    LoginComponent.prototype.login = function (loginModal) {
        var _this = this;
        this.loading = true;
        console.log('loginModal', loginModal);
        this.authService.login(loginModal.username, loginModal.password)
            .subscribe(function (res) {
            localStorage.setItem('userConfig', JSON.stringify(res));
            _this.authService.setMe(_this.returnUrl);
        }, function (err) {
            _this.loading = false;
            console.log('err', err);
            // Defining the Error Messages
            switch (err.status) {
                case 401:
                    _this.alert.error('Invalid Username Or Password');
                    setTimeout(function () { _this.alert.success(null); }, 2000);
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
    LoginComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-login',
                    templateUrl: './login.component.html',
                    styleUrls: ['./login.component.scss']
                },] },
    ];
    /** @nocollapse */
    LoginComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: user_service_1.UserService, },
        { type: auth_service_1.AuthService, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map