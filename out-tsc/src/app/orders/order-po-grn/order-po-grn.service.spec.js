"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_po_grn_service_1 = require("./order-po-grn.service");
describe('OrderPoGrnService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_po_grn_service_1.OrderPoGrnService]
        });
    });
    it('should be created', testing_1.inject([order_po_grn_service_1.OrderPoGrnService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-po-grn.service.spec.js.map