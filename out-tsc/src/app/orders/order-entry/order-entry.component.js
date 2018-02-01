"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var order_service_1 = require("./../order.service");
var presets_service_1 = require("../../presets/presets.service");
var OrderEntryComponent = /** @class */ (function () {
    function OrderEntryComponent(user, orderService, presetsService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderService = orderService;
        this.presetsService = presetsService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.orderNumberValidation = {};
        this.resOrder = {};
        this.params = {};
        this.edit = {};
        this.today = new Date();
        this.orderDate = new Date();
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Orders", "routerLink": "/orders" }
        ];
        this.appComponent.setActiveBreadcrumb('Entry', this.myBreadCrumb);
    }
    OrderEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderEntryForm = new forms_1.FormGroup({
            'buyer': new forms_1.FormGroup({
                'buyerCode': new forms_1.FormControl(),
                'buyerName': new forms_1.FormControl()
            }),
            'buyerContact': new forms_1.FormGroup({
                'contactName': new forms_1.FormControl(),
                'contactNumber': new forms_1.FormControl(),
                'contactEmail': new forms_1.FormControl(),
                'location': new forms_1.FormControl(),
                'address': new forms_1.FormGroup({
                    'PO': new forms_1.FormControl(),
                    'street': new forms_1.FormControl(),
                    'city': new forms_1.FormControl(),
                    'state': new forms_1.FormControl(),
                    'zipcode': new forms_1.FormControl()
                })
            }),
            'style': new forms_1.FormGroup({
                'styleCode': new forms_1.FormControl(),
                'styleName': new forms_1.FormControl(),
                'styleGender': new forms_1.FormControl(),
                'styleDescription': new forms_1.FormControl()
            }),
            'orderDate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'quantity': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'deliveryDate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'description': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, ng4_validators_1.CustomValidators.rangeLength([5, 300])])),
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.myOrderEntryForm.controls['orderDate'].setValue(this.orderService.formatDate(this.today));
        this.buyerId = new forms_1.FormControl();
        this.buyerContactId = new forms_1.FormControl();
        this.orderStyleId = new forms_1.FormControl();
        this.myOrderEntryForm.controls['orderDate'].valueChanges
            .subscribe(function (term) {
            // console.log('change in orderDate', term);
            // console.log('change in orderDate', term);
            _this.orderDate = term;
        });
        this.buyerId.valueChanges
            .subscribe(function (term) {
            _this.buyer = {
                "buyerCode": JSON.parse(term).buyerCode,
                "buyerName": JSON.parse(term).buyerName
            };
            // console.log('buyer', this.buyer);
            // console.log('buyer', this.buyer);
            _this.myOrderEntryForm.controls['buyer'].setValue(_this.buyer);
            _this.presetsService.getBuyerContacts(JSON.parse(term).buyerCode)
                .subscribe(function (res) {
                // console.log('getBuyerContactList', res);
                // console.log('getBuyerContactList', res);
                _this.buyerContactsList = res;
            }, function (err) {
                // console.log('getBuyerContactList', err);
            });
        });
        this.buyerContactId.valueChanges
            .subscribe(function (term) {
            _this.buyerContact = {
                'contactName': JSON.parse(term).contactName,
                'contactNumber': JSON.parse(term).contactNumber,
                'contactEmail': JSON.parse(term).contactEmail,
                'location': JSON.parse(term).location,
                'address': JSON.parse(term).address
            };
            // console.log('buyerContact', this.buyerContact);
            // console.log('buyerContact', this.buyerContact);
            _this.myOrderEntryForm.controls['buyerContact'].setValue(_this.buyerContact);
        });
        this.orderStyleId.valueChanges
            .subscribe(function (term) {
            _this.orderStyle = {
                "styleCode": JSON.parse(term).styleCode,
                "styleName": JSON.parse(term).styleName,
                "styleGender": JSON.parse(term).styleGender,
                "styleDescription": JSON.parse(term).styleDescription
            };
            // console.log('orderStyle', this.orderStyle);
            // console.log('orderStyle', this.orderStyle);
            _this.myOrderEntryForm.controls['style'].setValue(_this.orderStyle);
        });
        this.getBuyerLists();
        this.getStyleLists();
        this.params = {
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'orderNumber': this.aRoute.snapshot.paramMap.get('orderNumber')
        };
        // console.log('this.params',this.params);
        if (this.params.action == 'edit') {
            this.orderService.findOrder(this.params.orderNumber)
                .subscribe(function (res) {
                // console.log('findOrder','this.edit', res);
                // console.log('findOrder','this.edit', res);
                _this.edit = res;
                _this.myOrderEntryForm.controls['buyer'].setValue(_this.edit.buyer);
                _this.myOrderEntryForm.controls['buyerContact'].setValue(_this.edit.buyerContact);
                _this.myOrderEntryForm.controls['orderStyle'].setValue(_this.edit.orderStyle);
                _this.myOrderEntryForm.controls['orderNumber'].setValue(_this.edit.orderNumber);
                _this.myOrderEntryForm.controls['orderDate'].setValue(_this.orderService.formatDate(_this.edit.orderDate));
                _this.myOrderEntryForm.controls['orderQuantity'].setValue(_this.edit.orderQuantity);
                _this.myOrderEntryForm.controls['orderDeliveryDate'].setValue(_this.orderService.formatDate(_this.edit.orderDeliveryDate));
                _this.myOrderEntryForm.controls['orderDescription'].setValue(_this.edit.orderDescription);
            }, function (err) {
                _this.alert.error('Error Occured while Fetching Data');
            });
        }
    };
    OrderEntryComponent.prototype.checkExistanceOrderNumber = function () {
        var _this = this;
        // console.log('checkExistanceOrderNumber');
        this.orderNumberValidation = {};
        this.orderService.checkExistanceOrderNumber(this.myOrderEntryForm.controls['orderNumber'].value)
            .subscribe(function (res) {
            // console.log('checkExistanceOrderNumber',res);
            // console.log('checkExistanceOrderNumber',res);
            _this.orderNumberValidation = res;
        }, function (err) {
            // console.log('checkExistanceOrderNumber',err);
        });
    };
    OrderEntryComponent.prototype.addOrderEntry = function (order) {
        var _this = this;
        // this.myOrderEntryForm.disable();
        // this.loading = 'postOrder';
        // console.log('addOrderEntry',order);
        if (this.params.action == 'add') {
            this.orderService.postOrder(order)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrderEntryForm.reset();
                _this.myOrderEntryForm.enable();
                // console.log('addOrderEntryResponse', res);
                // console.log('addOrderEntryResponse', res);
                _this.resOrder = res;
                _this.orderService.setActiveOrder(res);
                // this.orderService.createImageContainer(res);
                // this.orderService.createImageContainer(res);
                _this.alert.success('Order Created Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
                // setTimeout(()=>{ this.router.navigate(['/orders.fabrics/']) }, 4000);
            }, function (err) {
                _this.alert.error('Error Ocuured while Creating Order');
                // console.log('addOrderEntryResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderService.putOrder(this.edit.id, order)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrderEntryForm.reset();
                _this.myOrderEntryForm.enable();
                // console.log('patchOrderEntryResponse', res);
                // console.log('patchOrderEntryResponse', res);
                _this.orderService.setActiveOrder(res);
                _this.alert.success(_this.edit.orderNumber + ' Order Updated Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.error('Error Occured while Updating ' + _this.edit.orderNumber + ' Order');
                // console.log('patchOrderEntryResponse', err);
            });
        }
    };
    OrderEntryComponent.prototype.getBuyerLists = function () {
        var _this = this;
        this.presetsService.getAllBuyers()
            .subscribe(function (res) {
            _this.buyersList = res;
            // console.log('getBuyersList',res);
        }, function (err) {
            // console.log('getBuyersList',err);
        });
    };
    OrderEntryComponent.prototype.getStyleLists = function () {
        var _this = this;
        this.presetsService.getAllStyles()
            .subscribe(function (res) {
            _this.stylesList = res;
            // console.log('getStylesList',res);
        }, function (err) {
            // console.log('getStylesList',err);
        });
    };
    OrderEntryComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-entry',
                    templateUrl: './order-entry.component.html',
                    styleUrls: ['./order-entry.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderEntryComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_service_1.OrderService, },
        { type: presets_service_1.PresetsService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderEntryComponent;
}());
exports.OrderEntryComponent = OrderEntryComponent;
//# sourceMappingURL=order-entry.component.js.map