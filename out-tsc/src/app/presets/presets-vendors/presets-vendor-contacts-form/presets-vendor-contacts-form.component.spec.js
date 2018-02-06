"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var presets_vendor_contacts_form_component_1 = require("./presets-vendor-contacts-form.component");
describe('PresetsVendorContactsFormComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [presets_vendor_contacts_form_component_1.PresetsVendorContactsFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(presets_vendor_contacts_form_component_1.PresetsVendorContactsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=presets-vendor-contacts-form.component.spec.js.map