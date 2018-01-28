"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var alert_service_1 = require("./../../_services/alert.service");
var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage()
            .subscribe(function (alert) {
            _this.message = alert;
        });
    };
    AlertComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-alert',
                    templateUrl: './alert.component.html',
                    styleUrls: ['./alert.component.scss']
                },] },
    ];
    /** @nocollapse */
    AlertComponent.ctorParameters = function () { return [
        { type: alert_service_1.AlertService, },
    ]; };
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map