"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_vendors_service_1 = require("./presets-vendors.service");
describe('PresetsVendorsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_vendors_service_1.PresetsVendorsService]
        });
    });
    it('should be created', testing_1.inject([presets_vendors_service_1.PresetsVendorsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-vendors.service.spec.js.map