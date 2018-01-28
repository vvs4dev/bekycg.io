"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyCustomValidators = /** @class */ (function () {
    function MyCustomValidators() {
    }
    MyCustomValidators.birthYear = function (c) {
        var numValue = Number(c.value);
        var currentYear = new Date().getFullYear();
        var minYear = currentYear - 85;
        var maxYear = currentYear - 18;
        var isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
        var message = {
            'years': {
                'message': 'The year must be a valid number between ' + minYear + ' and ' + maxYear
            }
        };
        return isValid ? null : message;
    };
    MyCustomValidators.countryCity = function (form) {
        var countryControl = form.get('location.country');
        var cityControl = form.get('location.city');
        if (countryControl != null && cityControl != null) {
            var country = countryControl.value;
            var city = cityControl.value;
            var error = null;
            if (country === 'France' && city !== 'Paris') {
                error = 'If the country is France, the city must be Paris';
            }
            var message = {
                'countryCity': {
                    'message': error
                }
            };
            return error ? message : null;
        }
    };
    MyCustomValidators.uniqueName = function (c) {
        var message = {
            'uniqueName': {
                'message': 'The name is not unique'
            }
        };
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(c.value === 'Existing' ? message : null);
            }, 1000);
        });
    };
    MyCustomValidators.telephoneNumber = function (c) {
        var isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
        var message = {
            'telephoneNumber': {
                'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
            }
        };
        return isValidPhoneNumber ? null : message;
    };
    MyCustomValidators.telephoneNumbers = function (form) {
        var message = {
            'telephoneNumbers': {
                'message': 'At least one telephone number must be entered'
            }
        };
        var phoneNumbers = form.get('phoneNumbers');
        var hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;
        return hasPhoneNumbers ? null : message;
    };
    return MyCustomValidators;
}());
exports.MyCustomValidators = MyCustomValidators;
//# sourceMappingURL=my-custom.validators.js.map