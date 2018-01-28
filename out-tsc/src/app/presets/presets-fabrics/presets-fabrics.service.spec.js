"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_fabrics_service_1 = require("./presets-fabrics.service");
describe('PresetsFabricsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_fabrics_service_1.PresetsFabricsService]
        });
    });
    it('should be created', testing_1.inject([presets_fabrics_service_1.PresetsFabricsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-fabrics.service.spec.js.map