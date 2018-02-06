"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_service_1 = require("./../order.service");
var pdfmake_1 = require("pdfmake/build/pdfmake");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
var OrderPoGrnComponent = /** @class */ (function () {
    function OrderPoGrnComponent(user, orderService, router, aRoute, alert, appComponent) {
        var _this = this;
        this.user = user;
        this.orderService = orderService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.myBreadCrumb = {};
        this.params = {};
        this.poGRNNumberExists = {};
        this.POsList = [];
        this.aOrder = {};
        this.fabricGRN = {};
        this.accessoryGRN = {};
        this.packerGRN = {};
        pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
        this.today = new Date();
        this.poGRNNumberExists.res = {};
        this.poGRNNumberExists.status = false;
        this.myBreadCrumb.crumbs = [
            { "menu": "Orders", "routerLink": "/orders" },
            { "menu": this.aRoute.snapshot.paramMap.get('orderNumber'), "routerLink": "" }
        ];
        this.myBreadCrumb.active = (this.aRoute.snapshot.paramMap.get('action') == 'add') ? 'New GRN' : 'Edit GRN';
        this.setaPO = new forms_1.FormControl();
        this.setaPO.valueChanges
            .subscribe(function (po) {
            // console.log('po', JSON.parse(po));
            if (_this.aPO) {
                // console.log('ifCase');
                while (_this.myOrderPoGrnForm.controls.items.value.length !== 0) {
                    _this.myOrderPoGrnForm.get('items').removeAt(0);
                }
                _this.aPO = JSON.parse(po);
                _this.prepareaPO();
            }
            else {
                // console.log('elseCase');
                // console.log('elseCase');
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
            'PONumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'PODate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'vendor': new forms_1.FormGroup({
                'vendorCode': new forms_1.FormControl(),
                'vendorName': new forms_1.FormControl()
            }),
            'vendorContact': new forms_1.FormGroup({
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
            'items': new forms_1.FormArray([]),
            'subtotal': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
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
        // console.log('validatePoGRNNumberChanged', grnNumber);
        this.poGRNNumberExists = {};
        this.poGRNNumberExists.aPoGRNNumber = grnNumber;
        this.orderService.validateGRNNumber(grnNumber)
            .subscribe(function (res) {
            // console.log('validatePoGRNNumber',res);
            // console.log('validatePoGRNNumber',res);
            _this.poGRNNumberExists.res = res;
            _this.poGRNNumberExists.status = _this.poGRNNumberExists.res.exists;
        }, function (err) {
            // console.log('validatePoGRNNumber',err);
        });
    };
    OrderPoGrnComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.checkExistanceOrderNumber(orderNumber)
            .subscribe(function (res) {
            // console.log('findOrderNumber',res);
            // console.log('findOrderNumber',res);
            _this.aOrder = res;
            _this.getPurchaseOrders('ordered');
        }, function (err) {
            // console.log('findOrderNumber',err);
        });
    };
    OrderPoGrnComponent.prototype.getPurchaseOrders = function (status) {
        var _this = this;
        this.orderService.getOrderPurchaseOrders(this.params.orderNumber)
            .subscribe(function (res) {
            // console.log('getPurchaseOrders("ordered")',res);
            // console.log('getPurchaseOrders("ordered")',res);
            _this.POsList = res;
        }, function (err) {
            // console.log('getPurchaseOrders("ordered")',err);
        });
    };
    OrderPoGrnComponent.prototype.prepareaPO = function () {
        this.aPO.GRNNumber = this.poGRNNumberExists.aPoGRNNumber;
        this.aPO.GRNDate = this.orderService.formatDate(this.today);
        this.aPO.PODate = this.orderService.formatDate(this.aPO.PODate);
        this.aOrder.aPOId = this.aPO['id'];
        delete this.aPO['createdDate'];
        delete this.aPO['createdBy'];
        delete this.aPO['lastModifiedDate'];
        delete this.aPO['lastModifiedBy'];
        delete this.aPO['id'];
        delete this.aPO['orderId'];
        // console.log('this.aPO after format', this.aPO)
        this.fillPurchaseOrder(this.aPO);
    };
    OrderPoGrnComponent.prototype.fillPurchaseOrder = function (aPO) {
        var _this = this;
        aPO.items.forEach(function (item, index) {
            // console.log('index');
            // console.log('add',index, this.aPO.items.length);
            // console.log('index');
            // console.log('add',index, this.aPO.items.length);
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
        // console.log('inputGRN', grn);
        var i = 0;
        grn.items.forEach(function (item, index) {
            if (item.itemQuantity == item.itemQuantityAccepted) {
                i++;
                // console.log('i',i,index,'index',grn.items.length,'grn.items.length');
            }
            if (index == grn.items.length - 1) {
                if (i == grn.items.length) {
                    grn.status = 'cleared';
                    // console.log('grnIfCleared', grn);
                    // console.log('grnIfCleared', grn);
                    _this.postGRN(grn);
                }
                else {
                    grn.status = 'substand';
                    // console.log('grnIfNotCleared', grn);
                    // console.log('grnIfNotCleared', grn);              
                    _this.postGRN(grn);
                }
            }
        });
    };
    OrderPoGrnComponent.prototype.postGRN = function (grn) {
        var _this = this;
        // console.log('postGRN', grn);
        this.myOrderPoGrnForm.disable();
        this.orderService.postGRN(this.aOrder.id, grn)
            .subscribe(function (res) {
            // console.log('postGRN', res);
            // console.log('postGRN', res);
            _this.alert.success('GRN Created Successfully');
            // this.orderPoGrnService.patchPOStatus(this.aOrder.aPOId, grn.status)
            //   .subscribe(
            //     res => {
            //     // console.log('patchPOStatus', res);
            //     },
            //     err => {
            //     // console.log('patchPOStatus', err);
            //     }
            //   )
            setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
        }, function (err) {
            // console.log('postGRN', err);
            // console.log('postGRN', err);
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