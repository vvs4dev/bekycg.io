"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_packers_service_1 = require("./order-packers.service");
var order_service_1 = require("./../order.service");
var OrderPackersComponent = /** @class */ (function () {
    function OrderPackersComponent(user, orderPackersService, orderService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderPackersService = orderPackersService;
        this.orderService = orderService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.orderPackersReq = {};
        this.orderDetails = {};
        this.params = {};
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Orders", "routerLink": "/orders" }
        ];
        this.appComponent.setActiveBreadcrumb('Packers', this.myBreadCrumb);
    }
    OrderPackersComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderPackersForm = new forms_1.FormGroup({
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackingMaterialItemCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackingMaterialItemName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackingMaterialItemType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackingMaterialDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'orderPackingMaterialUnitofMeasurement': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackingMaterialRate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackingMaterialRequiredPerPiece': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id')
        };
        console.log('params', this.params);
        this.findOrderNumber(this.params.orderNumber);
        this.myOrderPackersForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderPackersService.findOrderPackers(this.params.id)
                .subscribe(function (res) {
                console.log('findOrderPackers', 'this.edit', res);
                _this.edit = res;
                _this.myOrderPackersForm.controls['orderPackingMaterialItemCode'].setValue(_this.edit.orderPackingMaterialItemCode);
                _this.myOrderPackersForm.controls['orderPackingMaterialItemName'].setValue(_this.edit.orderPackingMaterialItemName);
                _this.myOrderPackersForm.controls['orderPackingMaterialItemType'].setValue(_this.edit.orderPackingMaterialItemType);
                _this.myOrderPackersForm.controls['orderPackingMaterialDescription'].setValue(_this.edit.orderPackingMaterialDescription);
                _this.myOrderPackersForm.controls['orderPackingMaterialUnitofMeasurement'].setValue(_this.edit.orderPackingMaterialUnitofMeasurement);
                _this.myOrderPackersForm.controls['orderPackingMaterialRate'].setValue(_this.edit.orderPackingMaterialRate);
                _this.myOrderPackersForm.controls['orderPackingMaterialRequiredPerPiece'].setValue(_this.edit.orderPackingMaterialRequiredPerPiece);
            });
        }
        this.getPackersList();
        this.orderPackingMaterialId = new forms_1.FormControl();
        this.orderPackingMaterialId.valueChanges
            .subscribe(function (term) {
            console.log('term', term);
            _this.myOrderPackersForm.controls['orderPackingMaterialItemCode'].setValue(JSON.parse(term).packingMaterialCode);
            _this.myOrderPackersForm.controls['orderPackingMaterialItemName'].setValue(JSON.parse(term).packingMaterialName);
            _this.myOrderPackersForm.controls['orderPackingMaterialItemType'].setValue(JSON.parse(term).packingMaterialType);
            _this.myOrderPackersForm.controls['orderPackingMaterialDescription'].setValue(JSON.parse(term).packingMaterialDescription);
        });
    };
    OrderPackersComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.findOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            console.log('findOrderNumber', res);
        }, function (err) {
            console.log('findOrderNumber', err);
        });
    };
    OrderPackersComponent.prototype.getPackersList = function () {
        var _this = this;
        this.orderPackersService.getPackersList()
            .subscribe(function (res) {
            _this.packersList = res;
            console.log('this.packersList', res);
        }, function (err) {
            console.log('this.packersList', err);
        });
    };
    OrderPackersComponent.prototype.addOrderPackers = function (orderPackers) {
        var _this = this;
        console.log('packers', orderPackers);
        this.myOrderPackersForm.disable();
        this.loading = true;
        console.log('addOrderPackers', orderPackers);
        if (this.params.action == 'add') {
            this.orderPackersService.postOrderPackers(this.orderDetails.id, orderPackers)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderPackersForm.reset();
                _this.myOrderPackersForm.enable();
                console.log('addOrderPackersResponse', res);
                _this.alert.success('Packing Material added to ' + _this.orderDetails.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Creating Packing Material');
                console.log('addOrderPackersResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderPackersService.patchOrderPackers(this.edit.id, orderPackers)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderPackersForm.reset();
                _this.myOrderPackersForm.enable();
                console.log('addOrderPackersResponse', res);
                _this.alert.success('Packing Material updated in ' + _this.orderDetails.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Occured while Updating Packing Materials');
                console.log('addOrderPackersResponse', err);
            });
        }
    };
    OrderPackersComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-packers',
                    templateUrl: './order-packers.component.html',
                    styleUrls: ['./order-packers.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderPackersComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_packers_service_1.OrderPackersService, },
        { type: order_service_1.OrderService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderPackersComponent;
}());
exports.OrderPackersComponent = OrderPackersComponent;
//# sourceMappingURL=order-packers.component.js.map