"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("@angular/common");
var i2 = require("./validation-errors.component");
var styles_ValidationErrorsComponent = [];
var RenderType_ValidationErrorsComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_ValidationErrorsComponent, data: {} });
exports.RenderType_ValidationErrorsComponent = RenderType_ValidationErrorsComponent;
function View_ValidationErrorsComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "li", [["style", "color: red"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }); }
function View_ValidationErrorsComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "ul", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n      "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_ValidationErrorsComponent_2)), i0.ɵdid(3, 802816, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.listOfErrors(); _ck(_v, 3, 0, currVal_0); }, null); }
function View_ValidationErrorsComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n    "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_ValidationErrorsComponent_1)), i0.ɵdid(2, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.shouldShowErrors(); _ck(_v, 2, 0, currVal_0); }, null); }
exports.View_ValidationErrorsComponent_0 = View_ValidationErrorsComponent_0;
function View_ValidationErrorsComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "validation-errors", [], null, null, null, View_ValidationErrorsComponent_0, RenderType_ValidationErrorsComponent)), i0.ɵdid(1, 49152, null, 0, i2.ValidationErrorsComponent, [], null, null)], null, null); }
exports.View_ValidationErrorsComponent_Host_0 = View_ValidationErrorsComponent_Host_0;
var ValidationErrorsComponentNgFactory = i0.ɵccf("validation-errors", i2.ValidationErrorsComponent, View_ValidationErrorsComponent_Host_0, { control: "control" }, {}, []);
exports.ValidationErrorsComponentNgFactory = ValidationErrorsComponentNgFactory;
//# sourceMappingURL=validation-errors.component.ngfactory.js.map