"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_purchase_order_service_1 = require("./order-purchase-order.service");
describe('OrderPurchaseOrderService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_purchase_order_service_1.OrderPurchaseOrderService]
        });
    });
    it('should be created', testing_1.inject([order_purchase_order_service_1.OrderPurchaseOrderService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-purchase-order.service.spec.js.map