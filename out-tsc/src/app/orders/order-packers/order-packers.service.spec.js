"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_packers_service_1 = require("./order-packers.service");
describe('OrderPackersService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_packers_service_1.OrderPackersService]
        });
    });
    it('should be created', testing_1.inject([order_packers_service_1.OrderPackersService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-packers.service.spec.js.map