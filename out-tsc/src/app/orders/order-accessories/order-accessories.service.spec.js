"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_accessories_service_1 = require("./order-accessories.service");
describe('OrderAccessoriesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_accessories_service_1.OrderAccessoriesService]
        });
    });
    it('should be created', testing_1.inject([order_accessories_service_1.OrderAccessoriesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-accessories.service.spec.js.map