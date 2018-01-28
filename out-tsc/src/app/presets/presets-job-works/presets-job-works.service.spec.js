"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_job_works_service_1 = require("./presets-job-works.service");
describe('PresetsJobWorksService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [presets_job_works_service_1.PresetsJobWorksService]
        });
    });
    it('should be created', testing_1.inject([presets_job_works_service_1.PresetsJobWorksService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=presets-job-works.service.spec.js.map