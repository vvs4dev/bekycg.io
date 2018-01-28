"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_packers_service_1 = require("./presets-packers.service");
describe('PresetsPackersService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_packers_service_1.PresetsPackersService]
        });
    });
    it('should be created', testing_1.inject([presets_packers_service_1.PresetsPackersService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-packers.service.spec.js.map