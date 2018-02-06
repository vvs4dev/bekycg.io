"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_service_1 = require("./../presets.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsStylesComponent = /** @class */ (function () {
    function PresetsStylesComponent(appComponent, presetsService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsService = presetsService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.styles = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedStyleItems = [];
        this.myBreadCrumb.crumbs = [
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.myBreadCrumb.active = 'Styles';
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.styles.res = {};
        this.styles.validation = {};
        this.fetchAllStyles();
        this.viewForm = false;
    }
    PresetsStylesComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myStyleForm = new forms_1.FormGroup({
            'id': new forms_1.FormControl(''),
            'masterId': new forms_1.FormControl(''),
            'styleCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'styleName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'styleGender': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'styleDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])]))
        });
    };
    PresetsStylesComponent.prototype.fetchAllStyles = function () {
        var _this = this;
        this.loading = 'getStyles';
        this.presetsService.getAllStyles()
            .subscribe(function (res) {
            // console.log('getAllStyles-Response',res);
            // console.log('getAllStyles-Response',res);
            _this.styles.res = res;
            _this.allItems = res;
            _this.setPage(1);
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
            _this.loading = '';
            // Defining the Error Messages
            switch (err.status) {
                case 401:
                    _this.alert.error('Invalid Username Or Password');
                    break;
                default:
                    _this.alert.error('Some Error Occured');
                    break;
            }
        });
    };
    PresetsStylesComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedStyleItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PresetsStylesComponent.prototype.resetStyleModal = function () {
        this.myStyleForm.reset();
        this.presetsService.aStyleToEdit = null;
    };
    PresetsStylesComponent.prototype.validateStyleCode = function (code) {
        var _this = this;
        // console.log('code', code);
        this.presetsService.validateMaster('style', code)
            .subscribe(function (res) {
            // console.log('validateStyleCode', res);
            // console.log('validateStyleCode', res);
            _this.styles.validation = res;
        }, function (err) {
            // console.log('validateStyleCode', err);
        });
        this.myStyleForm.controls.styleCode.setValue(code);
    };
    PresetsStylesComponent.prototype.addStyle = function (style) {
        var _this = this;
        this.myStyleForm.disable();
        this.loading = 'postStyle';
        style.masterId = '6d314ae26b713ab7';
        // console.log('style', style);
        this.presetsService.updateStyle(style)
            .subscribe(function (res) {
            _this.myStyleForm.reset();
            _this.viewForm = false;
            _this.myStyleForm.enable();
            // console.log('postStyle-Response', res);
            // console.log('postStyle-Response', res);
            _this.loading = '';
            _this.fetchAllStyles();
            if (!_this.presetsService.getActiveStyleToEdit()) {
                _this.alert.success('Style ' + style.styleCode + ' Created Successfully');
            }
            else {
                _this.alert.success('Style ' + style.styleCode + ' Updated Successfully');
            }
        }, function (err) {
            _this.myStyleForm.enable();
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
            _this.loading = '';
            // Defining the Error Messages
            switch (err.status) {
                case 401:
                    _this.alert.error('Fields Required');
                    break;
                case 422:
                    _this.alert.error('Please Fill All The Required Fields');
                    break;
                default:
                    _this.alert.error('Some Error Occured');
                    break;
            }
        });
    };
    PresetsStylesComponent.prototype.editStyle = function (style) {
        this.viewForm = true;
        delete style['createdDate'];
        delete style['createdBy'];
        delete style['lastModifiedDate'];
        delete style['lastModifiedBy'];
        // this.aStyleToEdit.id = style.id;
        // this.aStyleToEdit.styles = {};
        // this.aStyleToEdit.styles.styleName = (style.styleName)? style.styleName: null;
        // this.aStyleToEdit.styles.styleGender = (style.styleGender)? style.styleGender: null;
        // this.aStyleToEdit.styles.styleDescription = (style.styleDescription)? style.styleDescription: null;
        // this.aStyleToEdit.styles.styleCode = (style.styleCode)? style.styleCode: null;
        //   // console.log('aStyleToEdit', this.aStyleToEdit);
        this.presetsService.setActiveStyleToEdit(style);
        this.myStyleForm.setValue(style);
    };
    PresetsStylesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-presets-styles',
                    templateUrl: './presets-styles.component.html',
                    styleUrls: ['./presets-styles.component.scss']
                },] },
    ];
    /** @nocollapse */
    PresetsStylesComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: presets_service_1.PresetsService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsStylesComponent;
}());
exports.PresetsStylesComponent = PresetsStylesComponent;
//# sourceMappingURL=presets-styles.component.js.map