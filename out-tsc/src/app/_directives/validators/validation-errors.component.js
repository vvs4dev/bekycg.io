"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidationErrorsComponent = /** @class */ (function () {
    function ValidationErrorsComponent() {
    }
    ValidationErrorsComponent.prototype.shouldShowErrors = function () {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    };
    ValidationErrorsComponent.prototype.listOfErrors = function () {
        var _this = this;
        return Object.keys(this.control.errors)
            .map(function (field) { return _this.getMessage(field, _this.control.errors[field]); });
    };
    ValidationErrorsComponent.prototype.getMessage = function (type, params) {
        return ValidationErrorsComponent.errorMessages[type](params);
    };
    ValidationErrorsComponent.errorMessages = {
        'required': function () { return 'This field is required'; },
        'minlength': function (params) { return 'The min number of characters is ' + params.requiredLength; },
        'maxlength': function (params) { return 'The max allowed number of characters is ' + params.requiredLength; },
        'pattern': function (params) { return 'The required pattern is: ' + params.requiredPattern; },
        'years': function (params) { return params.message; },
        'countryCity': function (params) { return params.message; },
        'uniqueName': function (params) { return params.message; },
        'telephoneNumbers': function (params) { return params.message; },
        'telephoneNumber': function (params) { return params.message; }
    };
    ValidationErrorsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'validation-errors',
                    template: "\n    <ul *ngIf=\"shouldShowErrors()\">\n      <li style=\"color: red\" *ngFor=\"let error of listOfErrors()\">{{error}}</li>\n    </ul>\n  ",
                },] },
    ];
    /** @nocollapse */
    ValidationErrorsComponent.ctorParameters = function () { return []; };
    ValidationErrorsComponent.propDecorators = {
        "control": [{ type: core_1.Input },],
    };
    return ValidationErrorsComponent;
}());
exports.ValidationErrorsComponent = ValidationErrorsComponent;
//# sourceMappingURL=validation-errors.component.js.map