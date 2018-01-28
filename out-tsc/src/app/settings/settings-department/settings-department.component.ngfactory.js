"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("./settings-department.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("@angular/forms");
var i3 = require("@angular/common");
var i4 = require("./settings-department.component");
var i5 = require("../../_services/user.service");
var i6 = require("@angular/router");
var i7 = require("../../_services/alert.service");
var i8 = require("../settings.service");
var i9 = require("../../app.component");
var styles_SettingsDepartmentComponent = [i0.styles];
var RenderType_SettingsDepartmentComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_SettingsDepartmentComponent, data: {} });
exports.RenderType_SettingsDepartmentComponent = RenderType_SettingsDepartmentComponent;
function View_SettingsDepartmentComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [["id", "validation-error"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Invalid Name"]))], null, null); }
function View_SettingsDepartmentComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [["id", "validation-error"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Organisation already Exists"]))], null, null); }
function View_SettingsDepartmentComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "button", [["class", "uk-button uk-width-1-1 uk-button-primary"], ["type", "submit"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Submit "]))], null, null); }
function View_SettingsDepartmentComponent_4(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 3, "button", [["class", "uk-button uk-width-1-1 uk-button-primary"], ["type", "submit"]], [[8, "disabled", 0]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Logging In "])), (_l()(), i1.ɵeld(2, 0, null, null, 1, "span", [["style", "float:right;"]], null, null, null, null, null)), (_l()(), i1.ɵeld(3, 0, null, null, 0, "div", [["uk-spinner", ""]], null, null, null, null, null))], null, function (_ck, _v) { var currVal_0 = true; _ck(_v, 0, 0, currVal_0); }); }
function View_SettingsDepartmentComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 78, "div", [["class", "uk-width-1-1@s uk-width-1-2@m uk-width-1-2@l uk-align-center"], ["uk-grid", ""]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵeld(2, 0, null, null, 75, "div", [["class", "login-frame"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(5, 0, null, null, 1, "h3", [["class", "align-center"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Department"])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(11, 0, null, null, 64, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (i1.ɵnov(_v, 13).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i1.ɵnov(_v, 13).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("submit" === en)) {
        var pd_2 = (_co.addDepartmentData(_co.myOrganisationBranchDepartmentForm.value) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), i1.ɵdid(12, 16384, null, 0, i2.ɵbf, [], null, null), i1.ɵdid(13, 540672, null, 0, i2.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, null), i1.ɵprd(2048, null, i2.ControlContainer, null, [i2.FormGroupDirective]), i1.ɵdid(15, 16384, null, 0, i2.NgControlStatusGroup, [i2.ControlContainer], null, null), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵeld(17, 0, null, null, 53, "fieldset", [["class", "uk-fieldset"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵeld(19, 0, null, null, 16, "div", [["class", "uk-margin"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                  "])), (_l()(), i1.ɵeld(21, 0, null, null, 7, "input", [["autofocus", ""], ["class", "uk-input"], ["formControlName", "departmentName"], ["name", "departmentName"], ["placeholder", "Department Name"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 24)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 24).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 24)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 24)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i1.ɵdid(22, 278528, null, 0, i3.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i1.ɵpod(23, { "uk-form-danger": 0 }), i1.ɵdid(24, 16384, null, 0, i2.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i2.DefaultValueAccessor]), i1.ɵdid(26, 671744, null, 0, i2.FormControlName, [[3, i2.ControlContainer], [8, null], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { name: [0, "name"] }, null), i1.ɵprd(2048, null, i2.NgControl, null, [i2.FormControlName]), i1.ɵdid(28, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(), i1.ɵted(-1, null, ["\n                  "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SettingsDepartmentComponent_1)), i1.ɵdid(31, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n                  "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SettingsDepartmentComponent_2)), i1.ɵdid(34, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵeld(37, 0, null, null, 12, "div", [["class", "uk-margin"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                  "])), (_l()(), i1.ɵeld(39, 0, null, null, 9, "input", [["class", "uk-input"], ["formControlName", "departmentCode"], ["maxlength", "30"], ["name", "departmentCode"], ["placeholder", "Department Code"], ["type", "text"]], [[1, "maxlength", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 42)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 42).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 42)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 42)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i1.ɵdid(40, 278528, null, 0, i3.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i1.ɵpod(41, { "uk-form-danger": 0 }), i1.ɵdid(42, 16384, null, 0, i2.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(43, 540672, null, 0, i2.MaxLengthValidator, [], { maxlength: [0, "maxlength"] }, null), i1.ɵprd(1024, null, i2.NG_VALIDATORS, function (p0_0) { return [p0_0]; }, [i2.MaxLengthValidator]), i1.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i2.DefaultValueAccessor]), i1.ɵdid(46, 671744, null, 0, i2.FormControlName, [[3, i2.ControlContainer], [2, i2.NG_VALIDATORS], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { name: [0, "name"] }, null), i1.ɵprd(2048, null, i2.NgControl, null, [i2.FormControlName]), i1.ɵdid(48, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵeld(51, 0, null, null, 12, "div", [["class", "uk-margin"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n                "])), (_l()(), i1.ɵeld(53, 0, null, null, 9, "input", [["class", "uk-input"], ["formControlName", "departmentType"], ["maxlength", "30"], ["name", "departmentType"], ["placeholder", "Department Type"], ["type", "text"]], [[1, "maxlength", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (i1.ɵnov(_v, 56)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i1.ɵnov(_v, 56).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i1.ɵnov(_v, 56)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i1.ɵnov(_v, 56)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null)), i1.ɵdid(54, 278528, null, 0, i3.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i1.ɵpod(55, { "uk-form-danger": 0 }), i1.ɵdid(56, 16384, null, 0, i2.DefaultValueAccessor, [i1.Renderer2, i1.ElementRef, [2, i2.COMPOSITION_BUFFER_MODE]], null, null), i1.ɵdid(57, 540672, null, 0, i2.MaxLengthValidator, [], { maxlength: [0, "maxlength"] }, null), i1.ɵprd(1024, null, i2.NG_VALIDATORS, function (p0_0) { return [p0_0]; }, [i2.MaxLengthValidator]), i1.ɵprd(1024, null, i2.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i2.DefaultValueAccessor]), i1.ɵdid(60, 671744, null, 0, i2.FormControlName, [[3, i2.ControlContainer], [2, i2.NG_VALIDATORS], [8, null], [2, i2.NG_VALUE_ACCESSOR]], { name: [0, "name"] }, null), i1.ɵprd(2048, null, i2.NgControl, null, [i2.FormControlName]), i1.ɵdid(62, 16384, null, 0, i2.NgControlStatus, [i2.NgControl], null, null), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SettingsDepartmentComponent_3)), i1.ɵdid(66, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n              "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_SettingsDepartmentComponent_4)), i1.ɵdid(69, 16384, null, 0, i3.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵeld(72, 0, null, null, 2, "pre", [], null, null, null, null, null)), (_l()(), i1.ɵted(73, null, ["", ""])), i1.ɵpid(0, i3.JsonPipe, []), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵted(-1, null, ["    \n      "])), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.myOrganisationBranchDepartmentForm; _ck(_v, 13, 0, currVal_7); var currVal_15 = "uk-input"; var currVal_16 = _ck(_v, 23, 0, ((!_co.myOrganisationBranchDepartmentForm.controls["departmentName"].valid && _co.myOrganisationBranchDepartmentForm.controls["departmentName"].touched) && ((_co.myOrganisationBranchDepartmentForm.controls["departmentName"].errors == null) ? null : _co.myOrganisationBranchDepartmentForm.controls["departmentName"].errors.email))); _ck(_v, 22, 0, currVal_15, currVal_16); var currVal_17 = "departmentName"; _ck(_v, 26, 0, currVal_17); var currVal_18 = ((!_co.myOrganisationBranchDepartmentForm.controls["departmentName"].valid && _co.myOrganisationBranchDepartmentForm.controls["departmentName"].touched) && ((_co.myOrganisationBranchDepartmentForm.controls["departmentName"].errors == null) ? null : _co.myOrganisationBranchDepartmentForm.controls["departmentName"].errors.name)); _ck(_v, 31, 0, currVal_18); var currVal_19 = !_co.organisationName.available; _ck(_v, 34, 0, currVal_19); var currVal_28 = "uk-input"; var currVal_29 = _ck(_v, 41, 0, ((!_co.myOrganisationBranchDepartmentForm.controls["departmentCode"].valid && _co.myOrganisationBranchDepartmentForm.controls["departmentCode"].touched) && ((_co.myOrganisationBranchDepartmentForm.controls["departmentCode"].errors == null) ? null : _co.myOrganisationBranchDepartmentForm.controls["departmentCode"].errors.rangeLength))); _ck(_v, 40, 0, currVal_28, currVal_29); var currVal_30 = "30"; _ck(_v, 43, 0, currVal_30); var currVal_31 = "departmentCode"; _ck(_v, 46, 0, currVal_31); var currVal_40 = "uk-input"; var currVal_41 = _ck(_v, 55, 0, ((!_co.myOrganisationBranchDepartmentForm.controls["departmentType"].valid && _co.myOrganisationBranchDepartmentForm.controls["departmentType"].touched) && ((_co.myOrganisationBranchDepartmentForm.controls["departmentType"].errors == null) ? null : _co.myOrganisationBranchDepartmentForm.controls["departmentType"].errors.rangeLength))); _ck(_v, 54, 0, currVal_40, currVal_41); var currVal_42 = "30"; _ck(_v, 57, 0, currVal_42); var currVal_43 = "departmentType"; _ck(_v, 60, 0, currVal_43); var currVal_44 = !_co.loading; _ck(_v, 66, 0, currVal_44); var currVal_45 = _co.loading; _ck(_v, 69, 0, currVal_45); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵnov(_v, 15).ngClassUntouched; var currVal_1 = i1.ɵnov(_v, 15).ngClassTouched; var currVal_2 = i1.ɵnov(_v, 15).ngClassPristine; var currVal_3 = i1.ɵnov(_v, 15).ngClassDirty; var currVal_4 = i1.ɵnov(_v, 15).ngClassValid; var currVal_5 = i1.ɵnov(_v, 15).ngClassInvalid; var currVal_6 = i1.ɵnov(_v, 15).ngClassPending; _ck(_v, 11, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = i1.ɵnov(_v, 28).ngClassUntouched; var currVal_9 = i1.ɵnov(_v, 28).ngClassTouched; var currVal_10 = i1.ɵnov(_v, 28).ngClassPristine; var currVal_11 = i1.ɵnov(_v, 28).ngClassDirty; var currVal_12 = i1.ɵnov(_v, 28).ngClassValid; var currVal_13 = i1.ɵnov(_v, 28).ngClassInvalid; var currVal_14 = i1.ɵnov(_v, 28).ngClassPending; _ck(_v, 21, 0, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_20 = (i1.ɵnov(_v, 43).maxlength ? i1.ɵnov(_v, 43).maxlength : null); var currVal_21 = i1.ɵnov(_v, 48).ngClassUntouched; var currVal_22 = i1.ɵnov(_v, 48).ngClassTouched; var currVal_23 = i1.ɵnov(_v, 48).ngClassPristine; var currVal_24 = i1.ɵnov(_v, 48).ngClassDirty; var currVal_25 = i1.ɵnov(_v, 48).ngClassValid; var currVal_26 = i1.ɵnov(_v, 48).ngClassInvalid; var currVal_27 = i1.ɵnov(_v, 48).ngClassPending; _ck(_v, 39, 0, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27); var currVal_32 = (i1.ɵnov(_v, 57).maxlength ? i1.ɵnov(_v, 57).maxlength : null); var currVal_33 = i1.ɵnov(_v, 62).ngClassUntouched; var currVal_34 = i1.ɵnov(_v, 62).ngClassTouched; var currVal_35 = i1.ɵnov(_v, 62).ngClassPristine; var currVal_36 = i1.ɵnov(_v, 62).ngClassDirty; var currVal_37 = i1.ɵnov(_v, 62).ngClassValid; var currVal_38 = i1.ɵnov(_v, 62).ngClassInvalid; var currVal_39 = i1.ɵnov(_v, 62).ngClassPending; _ck(_v, 53, 0, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39); var currVal_46 = i1.ɵunv(_v, 73, 0, i1.ɵnov(_v, 74).transform(_co.myOrganisationBranchDepartmentForm.value)); _ck(_v, 73, 0, currVal_46); }); }
exports.View_SettingsDepartmentComponent_0 = View_SettingsDepartmentComponent_0;
function View_SettingsDepartmentComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-settings-department", [], null, null, null, View_SettingsDepartmentComponent_0, RenderType_SettingsDepartmentComponent)), i1.ɵdid(1, 114688, null, 0, i4.SettingsDepartmentComponent, [i5.UserService, i6.Router, i6.ActivatedRoute, i7.AlertService, i8.SettingsService, i9.AppComponent], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
exports.View_SettingsDepartmentComponent_Host_0 = View_SettingsDepartmentComponent_Host_0;
var SettingsDepartmentComponentNgFactory = i1.ɵccf("app-settings-department", i4.SettingsDepartmentComponent, View_SettingsDepartmentComponent_Host_0, {}, {}, []);
exports.SettingsDepartmentComponentNgFactory = SettingsDepartmentComponentNgFactory;
//# sourceMappingURL=settings-department.component.ngfactory.js.map