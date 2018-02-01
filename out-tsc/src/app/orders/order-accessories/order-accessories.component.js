"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_service_1 = require("./../order.service");
var presets_service_1 = require("../../presets/presets.service");
var OrderAccessoriesComponent = /** @class */ (function () {
    function OrderAccessoriesComponent(user, orderService, presetsService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderService = orderService;
        this.presetsService = presetsService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.orderAccessoriesReq = {};
        this.params = {};
        this.orderDetails = {};
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Orders", "routerLink": "/orders" }
        ];
        this.appComponent.setActiveBreadcrumb('Accessories', this.myBreadCrumb);
    }
    OrderAccessoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderAccessoriesForm = new forms_1.FormGroup({
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'orderAccessoryUnitofMeasurement': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryCost': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryQuantityRequiredPerPiece': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id')
        };
        // console.log('params', this.params);
        this.findOrderNumber(this.params.orderNumber);
        this.myOrderAccessoriesForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderService.findOrderAccessories(this.params.id)
                .subscribe(function (res) {
                // console.log('findOrderPackers','this.edit', res);
                // console.log('findOrderPackers','this.edit', res);
                _this.edit = res;
                _this.myOrderAccessoriesForm.controls['orderAccessoryCode'].setValue(_this.edit.orderAccessoryCode);
                _this.myOrderAccessoriesForm.controls['orderAccessoryName'].setValue(_this.edit.orderAccessoryName);
                _this.myOrderAccessoriesForm.controls['orderAccessoryType'].setValue(_this.edit.orderAccessoryType);
                _this.myOrderAccessoriesForm.controls['orderAccessoryDescription'].setValue(_this.edit.orderAccessoryDescription);
                _this.myOrderAccessoriesForm.controls['orderAccessoryUnitofMeasurement'].setValue(_this.edit.orderAccessoryUnitofMeasurement);
                _this.myOrderAccessoriesForm.controls['orderAccessoryCost'].setValue(_this.edit.orderAccessoryCost);
                _this.myOrderAccessoriesForm.controls['orderAccessoryQuantityRequiredPerPiece'].setValue(_this.edit.orderAccessoryQuantityRequiredPerPiece);
            });
        }
        this.getAccessoriesList();
        this.orderAccessoryId = new forms_1.FormControl();
        this.orderAccessoryId.valueChanges
            .subscribe(function (term) {
            // console.log('term',term);
            // console.log('term',term);
            _this.myOrderAccessoriesForm.controls['orderAccessoryCode'].setValue(JSON.parse(term).accessoryCode);
            _this.myOrderAccessoriesForm.controls['orderAccessoryName'].setValue(JSON.parse(term).accessoryName);
            _this.myOrderAccessoriesForm.controls['orderAccessoryType'].setValue(JSON.parse(term).accessoryType);
            _this.myOrderAccessoriesForm.controls['orderAccessoryDescription'].setValue(JSON.parse(term).accessoryDescription);
        });
    };
    OrderAccessoriesComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.checkExistanceOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            // console.log('findOrderNumber',res);
        }, function (err) {
            // console.log('findOrderNumber',err);
        });
    };
    OrderAccessoriesComponent.prototype.getAccessoriesList = function () {
        var _this = this;
        this.presetsService.getAllAccessories()
            .subscribe(function (res) {
            _this.accessoriesList = res;
            // console.log('this.accessoriesList',res);
        }, function (err) {
            // console.log('this.accessoriesList',err);
        });
    };
    OrderAccessoriesComponent.prototype.addOrderAccessories = function (orderAccessories) {
        var _this = this;
        // console.log('accessories',orderAccessories);
        this.myOrderAccessoriesForm.disable();
        this.loading = true;
        // console.log('addorderAccessories',orderAccessories);
        if (this.params.action == 'add') {
            this.orderService.postOrderAccessories(this.orderDetails.id, orderAccessories)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderAccessoriesForm.reset();
                _this.myOrderAccessoriesForm.enable();
                // console.log('addOrderAccessoriesResponse', res);
                // console.log('addOrderAccessoriesResponse', res);
                _this.alert.success('Accessories added to ' + _this.params.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Occured while Adding Accessories');
                // console.log('addOrderAccessoriesResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderService.putOrderAccessories(this.edit.id, orderAccessories)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderAccessoriesForm.reset();
                _this.myOrderAccessoriesForm.enable();
                // console.log('addOrderAccessoriesResponse', res);
                // console.log('addOrderAccessoriesResponse', res);
                _this.alert.success('Accessories updated in ' + _this.edit.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Updating Accessories');
                // console.log('addOrderAccessoriesResponse', err);
            });
        }
    };
    OrderAccessoriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-accessories',
                    templateUrl: './order-accessories.component.html',
                    styleUrls: ['./order-accessories.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderAccessoriesComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_service_1.OrderService, },
        { type: presets_service_1.PresetsService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderAccessoriesComponent;
}());
exports.OrderAccessoriesComponent = OrderAccessoriesComponent;
//# sourceMappingURL=order-accessories.component.js.map