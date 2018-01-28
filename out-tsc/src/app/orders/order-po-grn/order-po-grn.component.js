"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_po_grn_service_1 = require("./order-po-grn.service");
var order_service_1 = require("./../order.service");
var pdfmake_1 = require("pdfmake/build/pdfmake");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
var OrderPoGrnComponent = /** @class */ (function () {
    function OrderPoGrnComponent(user, orderPoGrnService, orderService, router, aRoute, alert, appComponent) {
        var _this = this;
        this.user = user;
        this.orderPoGrnService = orderPoGrnService;
        this.orderService = orderService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.params = {};
        this.poGRNNumberExists = {};
        this.POsList = [];
        this.aOrder = {};
        this.fabricGRN = {};
        this.accessoryGRN = {};
        this.packerGRN = {};
        pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
        this.today = new Date();
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Orders", "routerLink": "/orders" },
            { "menu": this.aRoute.snapshot.paramMap.get('orderNumber'), "routerLink": "" }
        ];
        this.appComponent.setActiveBreadcrumb('Goods Receipt Note', this.myBreadCrumb);
        this.poGRNNumberExists.status = false;
        this.setaPO = new forms_1.FormControl();
        this.setaPO.valueChanges
            .subscribe(function (po) {
            console.log('po', JSON.parse(po));
            if (_this.aPO) {
                console.log('ifCase');
                while (_this.myOrderPoGrnForm.controls.items.value.length !== 0) {
                    _this.myOrderPoGrnForm.get('items').removeAt(0);
                }
                _this.aPO = JSON.parse(po);
                _this.prepareaPO();
            }
            else {
                console.log('elseCase');
                _this.aPO = JSON.parse(po);
                _this.prepareaPO();
            }
        });
    }
    OrderPoGrnComponent.prototype.ngOnInit = function () {
        this.myOrderPoGrnForm = new forms_1.FormGroup({
            'GRNNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'GRNDate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'purchaseOrderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'purchaseOrderDate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'vendor': new forms_1.FormGroup({
                'vendorCode': new forms_1.FormControl(),
                'vendorName': new forms_1.FormControl()
            }),
            'vendorContact': new forms_1.FormGroup({
                'contactName': new forms_1.FormControl(),
                'contactNumber': new forms_1.FormControl(),
                'contactEmail': new forms_1.FormControl(),
                'location': new forms_1.FormGroup({
                    'country': new forms_1.FormControl(),
                    'PO': new forms_1.FormControl(),
                    'street': new forms_1.FormControl(),
                    'city': new forms_1.FormControl(),
                    'state': new forms_1.FormControl(),
                    'zipcode': new forms_1.FormControl()
                })
            }),
            'items': new forms_1.FormArray([]),
            'subTotal': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'tax': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'total': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'status': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id')
        };
        this.myOrderPoGrnForm.controls['GRNDate'].setValue(this.orderService.formatDate(this.today));
        this.findOrderNumber(this.params.orderNumber);
    };
    OrderPoGrnComponent.prototype.validatePoGRNNumber = function (grnNumber) {
        var _this = this;
        console.log('validatePoGRNNumberChanged', grnNumber);
        this.poGRNNumberExists = {};
        this.poGRNNumberExists.aPoGRNNumber = grnNumber;
        this.orderPoGrnService.validatePoGRNNumber(grnNumber)
            .subscribe(function (res) {
            console.log('validatePoGRNNumber', res);
            _this.poGRNNumberExists.res = res;
            _this.poGRNNumberExists.status = (_this.poGRNNumberExists.res.count == 0) ? false : true;
        }, function (err) {
            console.log('validatePoGRNNumber', err);
        });
    };
    OrderPoGrnComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.findOrderNumber(orderNumber)
            .subscribe(function (res) {
            console.log('findOrderNumber', res);
            _this.aOrder = res;
            _this.getPurchaseOrders('ordered');
        }, function (err) {
            console.log('findOrderNumber', err);
        });
    };
    OrderPoGrnComponent.prototype.getPurchaseOrders = function (status) {
        var _this = this;
        this.orderPoGrnService.getPurchaseOrders(this.aOrder.id, status)
            .subscribe(function (res) {
            console.log('getPurchaseOrders("ordered")', res);
            _this.POsList = res;
        }, function (err) {
            console.log('getPurchaseOrders("ordered")', err);
        });
    };
    OrderPoGrnComponent.prototype.prepareaPO = function () {
        this.aPO.GRNNumber = this.poGRNNumberExists.aPoGRNNumber;
        this.aPO.GRNDate = this.orderService.formatDate(this.today);
        this.aPO.purchaseOrderDate = this.orderService.formatDate(this.aPO.purchaseOrderDate);
        this.aOrder.aPOId = this.aPO['id'];
        delete this.aPO['audits'];
        delete this.aPO['id'];
        delete this.aPO['orderId'];
        console.log('this.aPO after format', this.aPO);
        this.fillPurchaseOrder(this.aPO);
    };
    OrderPoGrnComponent.prototype.fillPurchaseOrder = function (aPO) {
        var _this = this;
        aPO.items.forEach(function (item, index) {
            console.log('index');
            console.log('add', index, _this.aPO.items.length);
            _this.addItemGroup();
        });
        this.myOrderPoGrnForm.setValue(this.aPO);
    };
    // ===================================Items Group Start===========================================
    // ===================================Items Group Start===========================================
    OrderPoGrnComponent.prototype.buildItemGroup = 
    // ===================================Items Group Start===========================================
    function () {
        return new forms_1.FormGroup({
            'itemCode': new forms_1.FormControl(),
            'itemName': new forms_1.FormControl(),
            'itemDescription': new forms_1.FormControl(),
            'itemQuantity': new forms_1.FormControl(),
            'itemRate': new forms_1.FormControl(),
            'itemTotal': new forms_1.FormControl(),
            'itemGroup': new forms_1.FormControl(),
            'itemQuantityAccepted': new forms_1.FormControl(),
            'itemQuantitySubstanded': new forms_1.FormControl(),
            'itemQuantityRejected': new forms_1.FormControl()
        });
    };
    OrderPoGrnComponent.prototype.addItemGroup = function () {
        this.myOrderPoGrnForm.get('items').push(this.buildItemGroup());
    };
    // ===================================Items Group End===========================================
    // ===================================Items Group End===========================================
    OrderPoGrnComponent.prototype.prepareGRNToPost = 
    // ===================================Items Group End===========================================
    function (grn) {
        var _this = this;
        console.log('inputGRN', grn);
        var i = 0;
        grn.items.forEach(function (item, index) {
            if (item.itemQuantity == item.itemQuantityAccepted) {
                i++;
                console.log('i', i, index, 'index', grn.items.length, 'grn.items.length');
            }
            if (index == grn.items.length - 1) {
                if (i == grn.items.length) {
                    grn.status = 'cleared';
                    console.log('grnIfCleared', grn);
                    _this.postGRN(grn);
                }
                else {
                    grn.status = 'substand';
                    console.log('grnIfNotCleared', grn);
                    _this.postGRN(grn);
                }
            }
        });
    };
    OrderPoGrnComponent.prototype.postGRN = function (grn) {
        var _this = this;
        console.log('postGRN', grn);
        this.myOrderPoGrnForm.disable();
        this.orderPoGrnService.postGRN(this.aOrder.id, grn)
            .subscribe(function (res) {
            console.log('postGRN', res);
            _this.alert.success('GRN Created Successfully');
            _this.orderPoGrnService.patchPOStatus(_this.aOrder.aPOId, grn.status)
                .subscribe(function (res) {
                console.log('patchPOStatus', res);
            }, function (err) {
                console.log('patchPOStatus', err);
            });
            setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
        }, function (err) {
            console.log('postGRN', err);
            _this.alert.error('Error Occured while Creating GRN');
            _this.myOrderPoGrnForm.enable();
        });
    };
    OrderPoGrnComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-po-grn',
                    templateUrl: './order-po-grn.component.html',
                    styleUrls: ['./order-po-grn.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderPoGrnComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_po_grn_service_1.OrderPoGrnService, },
        { type: order_service_1.OrderService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderPoGrnComponent;
}());
exports.OrderPoGrnComponent = OrderPoGrnComponent;
//# sourceMappingURL=order-po-grn.component.js.map