"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_buyer_service_1 = require("./presets-buyer.service");
describe('PresetsBuyerService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_buyer_service_1.PresetsBuyerService]
        });
    });
    it('should be created', testing_1.inject([presets_buyer_service_1.PresetsBuyerService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-buyer.service.spec.js.map