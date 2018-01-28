"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("./alert.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("@angular/common");
var i3 = require("./alert.component");
var i4 = require("../../_services/alert.service");
var styles_AlertComponent = [i0.styles];
var RenderType_AlertComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_AlertComponent, data: {} });
exports.RenderType_AlertComponent = RenderType_AlertComponent;
function View_AlertComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 8, "div", [["uk-alert", ""]], null, null, null, null, null)), i1.ɵdid(1, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngClass: [0, "ngClass"] }, null), i1.ɵpod(2, { "alert": 0, "uk-alert-success": 1, "uk-alert-danger": 2 }), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(4, 0, null, null, 0, "a", [["class", "uk-alert-close"], ["uk-close", ""]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(6, 0, null, null, 1, "p", [["style", "text-align:center;font-weight:500"]], null, null, null, null, null)), (_l()(), i1.ɵted(7, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, _co.message, (_co.message.type === "success"), (_co.message.type === "error")); _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.message.text; _ck(_v, 7, 0, currVal_1); }); }
function View_AlertComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "div", [["class", "uk-align-center"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_AlertComponent_1)), i1.ɵdid(3, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.message; _ck(_v, 3, 0, currVal_0); }, null); }
exports.View_AlertComponent_0 = View_AlertComponent_0;
function View_AlertComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-alert", [], null, null, null, View_AlertComponent_0, RenderType_AlertComponent)), i1.ɵdid(1, 114688, null, 0, i3.AlertComponent, [i4.AlertService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_AlertComponent_Host_0 = View_AlertComponent_Host_0;
var AlertComponentNgFactory = i1.ɵccf("app-alert", i3.AlertComponent, View_AlertComponent_Host_0, {}, {}, []);
exports.AlertComponentNgFactory = AlertComponentNgFactory;
//# sourceMappingURL=alert.component.ngfactory.js.map