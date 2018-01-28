"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dash_service_1 = require("./dash.service");
describe('DashService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [dash_service_1.DashService]
        });
    });
    it('should be created', testing_1.inject([dash_service_1.DashService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=dash.service.spec.js.map