"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_accessories_service_1 = require("./order-accessories.service");
var order_service_1 = require("./../order.service");
var OrderAccessoriesComponent = /** @class */ (function () {
    function OrderAccessoriesComponent(user, orderAccessoriesService, orderService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderAccessoriesService = orderAccessoriesService;
        this.orderService = orderService;
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
            'orderAccessoryItemCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryItemName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryItemType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryItemDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'orderAccessoryItemUnitOfMeasurement': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryItemRate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderAccessoryItemQuantityRequiredPerPiece': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id')
        };
        console.log('params', this.params);
        this.findOrderNumber(this.params.orderNumber);
        this.myOrderAccessoriesForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderAccessoriesService.findOrderAccessories(this.params.id)
                .subscribe(function (res) {
                console.log('findOrderPackers', 'this.edit', res);
                _this.edit = res;
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemCode'].setValue(_this.edit.orderAccessoryItemCode);
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemName'].setValue(_this.edit.orderAccessoryItemName);
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemType'].setValue(_this.edit.orderAccessoryItemType);
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemDescription'].setValue(_this.edit.orderAccessoryItemDescription);
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemUnitOfMeasurement'].setValue(_this.edit.orderAccessoryItemUnitOfMeasurement);
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemRate'].setValue(_this.edit.orderAccessoryItemRate);
                _this.myOrderAccessoriesForm.controls['orderAccessoryItemQuantityRequiredPerPiece'].setValue(_this.edit.orderAccessoryItemQuantityRequiredPerPiece);
            });
        }
        this.getAccessoriesList();
        this.orderAccessoryItemId = new forms_1.FormControl();
        this.orderAccessoryItemId.valueChanges
            .subscribe(function (term) {
            console.log('term', term);
            _this.myOrderAccessoriesForm.controls['orderAccessoryItemCode'].setValue(JSON.parse(term).accessoryItemCode);
            _this.myOrderAccessoriesForm.controls['orderAccessoryItemName'].setValue(JSON.parse(term).accessoryItemName);
            _this.myOrderAccessoriesForm.controls['orderAccessoryItemType'].setValue(JSON.parse(term).accessoryItemType);
            _this.myOrderAccessoriesForm.controls['orderAccessoryItemDescription'].setValue(JSON.parse(term).accessoryItemDescription);
        });
    };
    OrderAccessoriesComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.findOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            console.log('findOrderNumber', res);
        }, function (err) {
            console.log('findOrderNumber', err);
        });
    };
    OrderAccessoriesComponent.prototype.getAccessoriesList = function () {
        var _this = this;
        this.orderAccessoriesService.getAccessoriesList()
            .subscribe(function (res) {
            _this.accessoriesList = res;
            console.log('this.accessoriesList', res);
        }, function (err) {
            console.log('this.accessoriesList', err);
        });
    };
    OrderAccessoriesComponent.prototype.addOrderAccessories = function (orderAccessories) {
        var _this = this;
        console.log('accessories', orderAccessories);
        this.myOrderAccessoriesForm.disable();
        this.loading = true;
        console.log('addorderAccessories', orderAccessories);
        if (this.params.action == 'add') {
            this.orderAccessoriesService.postOrderAccessories(this.orderDetails.id, orderAccessories)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderAccessoriesForm.reset();
                _this.myOrderAccessoriesForm.enable();
                console.log('addOrderAccessoriesResponse', res);
                _this.alert.success('Accessories added to ' + _this.orderDetails.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Occured while Adding Accessories');
                console.log('addOrderAccessoriesResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderAccessoriesService.patchOrderAccessories(this.edit.id, orderAccessories)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderAccessoriesForm.reset();
                _this.myOrderAccessoriesForm.enable();
                console.log('addOrderAccessoriesResponse', res);
                _this.alert.success('Accessories updated in ' + _this.edit.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Updating Accessories');
                console.log('addOrderAccessoriesResponse', err);
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
        { type: order_accessories_service_1.OrderAccessoriesService, },
        { type: order_service_1.OrderService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderAccessoriesComponent;
}());
exports.OrderAccessoriesComponent = OrderAccessoriesComponent;
//# sourceMappingURL=order-accessories.component.js.map