"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_job_work_service_1 = require("./order-job-work.service");
describe('OrderJobWorkService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_job_work_service_1.OrderJobWorkService]
        });
    });
    it('should be created', testing_1.inject([order_job_work_service_1.OrderJobWorkService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-job-work.service.spec.js.map