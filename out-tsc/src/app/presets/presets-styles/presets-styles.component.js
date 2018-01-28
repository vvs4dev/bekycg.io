"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var presets_styles_service_1 = require("./presets-styles.service");
var pager_service_1 = require("./../../_services/pager.service");
var router_1 = require("@angular/router");
var PresetsStylesComponent = /** @class */ (function () {
    function PresetsStylesComponent(appComponent, presetsStylesService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.presetsStylesService = presetsStylesService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        this.aStyleToEdit = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedStyleItems = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Presets", "routerLink": "/presets" }
        ];
        this.appComponent.setActiveBreadcrumb('Styles', this.myBreadCrumb);
        this.noOfItemsinPage = 5;
        this.loading = '';
        this.fetchAllStyles();
    }
    PresetsStylesComponent.prototype.ngOnInit = function () {
        // Form Settings
        this.myStyleForm = new forms_1.FormGroup({
            'styleCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([3, 50])])),
            'styleName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 30])])),
            'styleForGender': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'styleDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])]))
        });
    };
    PresetsStylesComponent.prototype.fetchAllStyles = function () {
        var _this = this;
        this.loading = 'getStyles';
        this.presetsStylesService.getAllStyles()
            .subscribe(function (res) {
            console.log('getAllStyles-Response', res);
            _this.styles = res;
            _this.allItems = res;
            _this.setPage(1);
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            console.log('err', err);
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
        this.aStyleToEdit = null;
        this.presetsStylesService.aStyleToEdit = null;
    };
    PresetsStylesComponent.prototype.addStyle = function (style) {
        var _this = this;
        this.myStyleForm.disable();
        this.loading = 'postStyle';
        console.log('style', style);
        this.presetsStylesService.postStyle(style)
            .subscribe(function (res) {
            _this.myStyleForm.reset();
            _this.myStyleForm.enable();
            console.log('postStyle-Response', res);
            _this.loading = '';
            _this.fetchAllStyles();
            if (!_this.aStyleToEdit) {
                _this.alert.success('Style Created Successfully');
            }
            else {
                _this.alert.success('Style Updated Successfully');
            }
        }, function (err) {
            _this.myStyleForm.enable();
            _this.loading = false;
            console.log('err', err);
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
        this.aStyleToEdit.id = style.id;
        this.aStyleToEdit.styles = {};
        this.aStyleToEdit.styles.styleName = (style.styleName) ? style.styleName : null;
        this.aStyleToEdit.styles.styleForGender = (style.styleForGender) ? style.styleForGender : null;
        this.aStyleToEdit.styles.styleDescription = (style.styleDescription) ? style.styleDescription : null;
        this.aStyleToEdit.styles.styleCode = (style.styleCode) ? style.styleCode : null;
        console.log('aStyleToEdit', this.aStyleToEdit);
        this.presetsStylesService.setActiveStyleToEdit(this.aStyleToEdit);
        this.myStyleForm.setValue(this.aStyleToEdit.styles, { onlySelf: true });
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
        { type: presets_styles_service_1.PresetsStylesService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return PresetsStylesComponent;
}());
exports.PresetsStylesComponent = PresetsStylesComponent;
//# sourceMappingURL=presets-styles.component.js.map