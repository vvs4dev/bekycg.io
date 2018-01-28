"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_fabrics_service_1 = require("./order-fabrics.service");
describe('OrderFabricsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_fabrics_service_1.OrderFabricsService]
        });
    });
    it('should be created', testing_1.inject([order_fabrics_service_1.OrderFabricsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-fabrics.service.spec.js.map