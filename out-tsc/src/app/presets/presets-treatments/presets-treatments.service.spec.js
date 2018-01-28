"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_treatments_service_1 = require("./presets-treatments.service");
describe('PresetsTreatmentsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_treatments_service_1.PresetsTreatmentsService]
        });
    });
    it('should be created', testing_1.inject([presets_treatments_service_1.PresetsTreatmentsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-treatments.service.spec.js.map