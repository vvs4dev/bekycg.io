"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var order_entry_service_1 = require("./order-entry.service");
describe('OrderEntryService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [order_entry_service_1.OrderEntryService]
        });
    });
    it('should be created', testing_1.inject([order_entry_service_1.OrderEntryService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=order-entry.service.spec.js.map