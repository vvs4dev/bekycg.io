"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_service_1 = require("./presets.service");
describe('PresetsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_service_1.PresetsService]
        });
    });
    it('should be created', testing_1.inject([presets_service_1.PresetsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets.service.spec.js.map