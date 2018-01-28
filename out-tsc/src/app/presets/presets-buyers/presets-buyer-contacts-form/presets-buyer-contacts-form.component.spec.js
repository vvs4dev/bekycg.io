"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_buyer_contacts_form_component_1 = require("./presets-buyer-contacts-form.component");
describe('PresetsBuyerContactsFormComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [presets_buyer_contacts_form_component_1.PresetsBuyerContactsFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(presets_buyer_contacts_form_component_1.PresetsBuyerContactsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=presets-buyer-contacts-form.component.spec.js.map