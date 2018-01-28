"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_component_1 = require("../app.component");
var router_1 = require("@angular/router");
var user_service_1 = require("../_services/user.service");
var StoresComponent = /** @class */ (function () {
    function StoresComponent(appComponent, user, 
        // private presetsService: PresetsService,
        router) {
        this.appComponent = appComponent;
        this.user = user;
        this.router = router;
        this.myBreadCrumb = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" }
        ];
        this.appComponent.setActiveBreadcrumb('Stores', this.myBreadCrumb);
    }
    StoresComponent.prototype.ngOnInit = function () {
    };
    StoresComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-stores',
                    templateUrl: './stores.component.html',
                    styleUrls: ['./stores.component.scss']
                },] },
    ];
    /** @nocollapse */
    StoresComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: user_service_1.UserService, },
        { type: router_1.Router, },
    ]; };
    return StoresComponent;
}());
exports.StoresComponent = StoresComponent;
//# sourceMappingURL=stores.component.js.map