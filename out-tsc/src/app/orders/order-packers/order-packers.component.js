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
var OrderPackersComponent = /** @class */ (function () {
    function OrderPackersComponent(user, orderService, presetsService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderService = orderService;
        this.presetsService = presetsService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.myBreadCrumb = {};
        this.orderPackersReq = {};
        this.orderDetails = {};
        this.params = {};
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id')
        };
        // console.log('params', this.params);
        this.findOrderNumber(this.params.orderNumber);
        this.myBreadCrumb.crumbs = [
            { "menu": "Orders", "routerLink": "/orders" },
            { "menu": this.params.orderNumber, "routerLink": "/orders" },
        ];
        this.myBreadCrumb.active = (this.aRoute.snapshot.paramMap.get('action') == 'add') ? 'Add Packer' : 'Edit Packer';
    }
    OrderPackersComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderPackersForm = new forms_1.FormGroup({
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackerCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackerName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackerType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackerDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'orderPackerUnitofMeasurement': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackerCost': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderPackerQuantityRequiredPerPiece': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.myOrderPackersForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderService.findOrderPackers(this.params.id)
                .subscribe(function (res) {
                // console.log('findOrderPackers','this.edit', res);
                // console.log('findOrderPackers','this.edit', res);
                _this.edit = res;
                _this.myOrderPackersForm.controls['orderPackerCode'].setValue(_this.edit.orderPackerCode);
                _this.myOrderPackersForm.controls['orderPackerName'].setValue(_this.edit.orderPackerName);
                _this.myOrderPackersForm.controls['orderPackerType'].setValue(_this.edit.orderPackerType);
                _this.myOrderPackersForm.controls['orderPackerDescription'].setValue(_this.edit.orderPackerDescription);
                _this.myOrderPackersForm.controls['orderPackerUnitofMeasurement'].setValue(_this.edit.orderPackerUnitofMeasurement);
                _this.myOrderPackersForm.controls['orderPackerCost'].setValue(_this.edit.orderPackerCost);
                _this.myOrderPackersForm.controls['orderPackerQuantityRequiredPerPiece'].setValue(_this.edit.orderPackerQuantityRequiredPerPiece);
            });
        }
        this.getPackersList();
        this.orderPackerId = new forms_1.FormControl();
        this.orderPackerId.valueChanges
            .subscribe(function (term) {
            // console.log('term',term);
            // console.log('term',term);
            _this.myOrderPackersForm.controls['orderPackerCode'].setValue(JSON.parse(term).packerCode);
            _this.myOrderPackersForm.controls['orderPackerName'].setValue(JSON.parse(term).packerName);
            _this.myOrderPackersForm.controls['orderPackerType'].setValue(JSON.parse(term).packerType);
            _this.myOrderPackersForm.controls['orderPackerDescription'].setValue(JSON.parse(term).packerDescription);
        });
    };
    OrderPackersComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.checkExistanceOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            // console.log('findOrderNumber',res);
        }, function (err) {
            // console.log('findOrderNumber',err);
        });
    };
    OrderPackersComponent.prototype.getPackersList = function () {
        var _this = this;
        this.presetsService.getAllPackers()
            .subscribe(function (res) {
            _this.packersList = res;
            // console.log('this.packersList',res);
        }, function (err) {
            // console.log('this.packersList',err);
        });
    };
    OrderPackersComponent.prototype.addOrderPackers = function (orderPackers) {
        var _this = this;
        // console.log('packers',orderPackers);
        this.myOrderPackersForm.disable();
        this.loading = true;
        // console.log('addOrderPackers',orderPackers);
        if (this.params.action == 'add') {
            this.orderService.postOrderPackers(this.orderDetails.id, orderPackers)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderPackersForm.reset();
                _this.myOrderPackersForm.enable();
                // console.log('addOrderPackersResponse', res);
                // console.log('addOrderPackersResponse', res);
                _this.alert.success('Packing Material added to ' + _this.params.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Creating Packing Material');
                // console.log('addOrderPackersResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderService.putOrderPackers(this.edit.id, orderPackers)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderPackersForm.reset();
                _this.myOrderPackersForm.enable();
                // console.log('addOrderPackersResponse', res);
                // console.log('addOrderPackersResponse', res);
                _this.alert.success('Packing Material updated in ' + _this.params.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Occured while Updating Packing Materials');
                // console.log('addOrderPackersResponse', err);
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
        { type: order_service_1.OrderService, },
        { type: presets_service_1.PresetsService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderPackersComponent;
}());
exports.OrderPackersComponent = OrderPackersComponent;
//# sourceMappingURL=order-packers.component.js.map