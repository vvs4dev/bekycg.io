"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_styles_service_1 = require("./presets-styles.service");
describe('PresetsStylesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_styles_service_1.PresetsStylesService]
        });
    });
    it('should be created', testing_1.inject([presets_styles_service_1.PresetsStylesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-styles.service.spec.js.map