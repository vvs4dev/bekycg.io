"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_purchase_order_service_1 = require("./order-purchase-order.service");
var order_service_1 = require("./../order.service");
var pdfmake_1 = require("pdfmake/build/pdfmake");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
var OrderPurchaseOrderComponent = /** @class */ (function () {
    function OrderPurchaseOrderComponent(user, orderPurchaseOrderService, orderService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderPurchaseOrderService = orderPurchaseOrderService;
        this.orderService = orderService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.params = {};
        this.purchaseOrderNumberExists = {};
        this.materialList = [];
        this.aPO = {};
        this.vendor = {};
        this.vendorContact = {};
        this.vendorsList = [];
        this.vendorContactsList = [];
        this.aOrder = {};
        this.itemTotals = [];
        this.aItem = {};
        this.fabricToLoad = {};
        this.accessoryToLoad = {};
        this.packerToLoad = {};
        this.itemsToLoad = [];
        pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
        this.purchaseOrderNumberExists.status = false;
        this.today = new Date();
        this.itemsToLoad = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Orders", "routerLink": "/orders" },
            { "menu": this.aRoute.snapshot.paramMap.get('orderNumber'), "routerLink": "" }
        ];
        this.appComponent.setActiveBreadcrumb('Purchase Order', this.myBreadCrumb);
        this.materialList = [
            {
                'name': 'Fabrics',
                'id': 'of'
            },
            {
                'name': 'Accessories',
                'id': 'oa'
            },
            {
                'name': 'Packing Material',
                'id': 'op'
            }
        ];
        console.log('this.materialList', this.materialList);
    }
    OrderPurchaseOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderPurchaseOrderForm = new forms_1.FormGroup({
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
        console.log('this.params', this.params);
        this.myOrderPurchaseOrderForm.controls['purchaseOrderDate'].setValue(this.orderService.formatDate(this.today));
        this.myOrderPurchaseOrderForm.controls['status'].setValue('ordered');
        this.myOrderPurchaseOrderForm.controls['orderNumber'].setValue(this.params.orderNumber);
        this.findOrderNumber(this.params.orderNumber);
        this.getVendorLists();
        this.materialId = new forms_1.FormControl();
        this.vendorId = new forms_1.FormControl();
        this.vendorContactId = new forms_1.FormControl();
        this.loadFabric = new forms_1.FormControl();
        this.loadAccessories = new forms_1.FormControl();
        this.loadPackers = new forms_1.FormControl();
        this.vendorId.valueChanges
            .subscribe(function (term) {
            _this.vendor = {
                "vendorCode": JSON.parse(term).vendorCode,
                "vendorName": JSON.parse(term).vendorName
            };
            console.log('vendor', _this.vendor);
            _this.myOrderPurchaseOrderForm.controls['vendor'].setValue(_this.vendor);
            _this.orderPurchaseOrderService.getVendorContactList(JSON.parse(term).id)
                .subscribe(function (res) {
                console.log('this.getVendorContactList', res);
                _this.vendorContactsList = res;
            }, function (err) {
                console.log('this.getVendorContactList', err);
            });
        });
        this.vendorContactId.valueChanges
            .subscribe(function (term) {
            _this.vendorContact = {
                'contactName': JSON.parse(term).contactName,
                'contactNumber': JSON.parse(term).contactNumber,
                'contactEmail': JSON.parse(term).contactEmail,
                'location': JSON.parse(term).location
            };
            console.log('vendorContact', _this.vendorContact);
            _this.myOrderPurchaseOrderForm.controls['vendorContact'].setValue(_this.vendorContact);
        });
        this.loadFabric.valueChanges
            .subscribe(function (term) {
            console.log('loadFabric', term);
            if (term) {
                _this.getOrderFabricsLists(_this.aOrder.id);
            }
        });
        this.loadAccessories.valueChanges
            .subscribe(function (term) {
            console.log('loadAccessories', term);
            if (term) {
                _this.getOrderAccessoriesLists(_this.aOrder.id);
            }
        });
        this.loadPackers.valueChanges
            .subscribe(function (term) {
            console.log('loadPackers', term);
            if (term) {
                _this.getOrderPackersLists(_this.aOrder.id);
            }
        });
    };
    // ================================= Fetching the Basic Data ==================================== 
    // ================================= Fetching the Basic Data ====================================
    OrderPurchaseOrderComponent.prototype.getVendorLists = 
    // ================================= Fetching the Basic Data ====================================
    function () {
        var _this = this;
        this.orderPurchaseOrderService.getVendorsList()
            .subscribe(function (res) {
            _this.vendorsList = res;
            console.log('this.getVendorLists', res);
        }, function (err) {
            console.log('this.getVendorLists', err);
        });
    };
    OrderPurchaseOrderComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.findOrderNumber(orderNumber)
            .subscribe(function (res) {
            console.log('findOrderNumber', res);
            _this.aOrder = res;
        }, function (err) {
            console.log('findOrderNumber', err);
        });
    };
    OrderPurchaseOrderComponent.prototype.validatePurchaseOrderNumber = function (poNumber) {
        var _this = this;
        console.log('purchaseOrderNumberChanged', poNumber);
        this.purchaseOrderNumberExists = {};
        this.orderPurchaseOrderService.validatePurchaseOrderNumber(poNumber)
            .subscribe(function (res) {
            console.log('checkExistanceOrderNumber', res);
            _this.purchaseOrderNumberExists = res;
            _this.purchaseOrderNumberExists.status = (_this.purchaseOrderNumberExists.count == 0) ? false : true;
            _this.myOrderPurchaseOrderForm.controls['purchaseOrderNumber'].setValue(poNumber);
        }, function (err) {
            console.log('checkExistanceOrderNumber', err);
            _this.myOrderPurchaseOrderForm.controls['purchaseOrderNumber'].setValue(poNumber);
        });
    };
    // ===================================Items Group Start===========================================
    // ===================================Items Group Start===========================================
    OrderPurchaseOrderComponent.prototype.buildItemGroup = 
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
    OrderPurchaseOrderComponent.prototype.addItemGroup = function () {
        this.myOrderPurchaseOrderForm.get('items').push(this.buildItemGroup());
    };
    OrderPurchaseOrderComponent.prototype.removeItemGroup = function (i, item) {
        this.myOrderPurchaseOrderForm.get('items').removeAt(i);
        console.log('removedItem', item);
        this.calculateTotals();
    };
    // ===================================Items Group End===========================================
    // ===================================Calculations Start===========================================
    // ===================================Items Group End===========================================
    // ===================================Calculations Start===========================================
    OrderPurchaseOrderComponent.prototype.calculateItemTotal = 
    // ===================================Items Group End===========================================
    // ===================================Calculations Start===========================================
    function (i, item) {
        if (item.itemQuantity && item.itemRate) {
            this.aItem = item;
            console.log('this.aItem', this.aItem);
            this.aItem.itemTotal = this.aItem.itemQuantity * this.aItem.itemRate;
            this.calculateTotals();
        }
    };
    OrderPurchaseOrderComponent.prototype.calculateTotals = function () {
        var _this = this;
        this.subTotals = 0;
        this.itemsToLoad = this.myOrderPurchaseOrderForm.controls.items.value;
        console.log('calculateTotals', this.itemsToLoad);
        this.itemsToLoad.forEach(function (item, index) {
            _this.subTotals += item.itemTotal;
            console.log('calculatedSubTotal', _this.subTotals);
        });
        this.myOrderPurchaseOrderForm.controls.subTotal.setValue(this.subTotals);
        this.myOrderPurchaseOrderForm.controls.tax.setValue(parseInt(this.myOrderPurchaseOrderForm.controls.subTotal.value) * 18 / 100);
        this.myOrderPurchaseOrderForm.controls.total.setValue(parseInt(this.myOrderPurchaseOrderForm.controls.subTotal.value) + parseInt(this.myOrderPurchaseOrderForm.controls.tax.value));
    };
    // ===================================Calculations End===========================================
    // ===================================Sourcing Items End===========================================
    // ===================================Calculations End===========================================
    // ===================================Sourcing Items End===========================================
    OrderPurchaseOrderComponent.prototype.setTheFabricItemsArray = 
    // ===================================Calculations End===========================================
    // ===================================Sourcing Items End===========================================
    function (item) {
        this.fabricToLoad.toLoad.push({
            'itemCode': item.orderFabricCode,
            'itemName': item.orderFabricMaterial.fabricMaterialName,
            'itemDescription': item.orderFabricMaterial.fabricMaterialType + ',' + item.orderFabricColor,
            'itemQuantity': item.orderFabricRequired,
            'itemRate': item.orderFabricRate,
            'itemTotal': item.orderFabricRequired * item.orderFabricRate,
            'itemGroup': 'of',
            'itemQuantityAccepted': null,
            'itemQuantitySubstanded': null,
            'itemQuantityRejected': null
        });
        console.log('setTheFabricItemsArray', this.fabricToLoad.toLoad);
    };
    OrderPurchaseOrderComponent.prototype.getOrderFabricsLists = function (id) {
        var _this = this;
        this.orderPurchaseOrderService.getOrderFabrics(id)
            .subscribe(function (res) {
            console.log('getOrderFabrics', res);
            _this.fabricToLoad.res = res;
            _this.fabricToLoad.toLoad = [];
            console.log('this.fabricToLoad.res', _this.fabricToLoad);
            _this.fabricToLoad.res.forEach(function (item, index) {
                console.log('fabric -index', index);
                _this.addItemGroup();
                _this.setTheFabricItemsArray(item);
                if (index == (_this.fabricToLoad.res.length - 1)) {
                    _this.fabricToLoad.toLoad.forEach(function (item, index) {
                        _this.itemsToLoad.push(item);
                    });
                    _this.myOrderPurchaseOrderForm.controls['items'].setValue(_this.itemsToLoad);
                    _this.calculateTotals();
                }
            });
        }, function (err) {
            console.log('getOrderFabrics', err);
        });
    };
    OrderPurchaseOrderComponent.prototype.setTheAccessoryItemsArray = function (item) {
        this.accessoryToLoad.toLoad.push({
            'itemCode': item.orderAccessoryItemCode,
            'itemName': item.orderAccessoryItemName,
            'itemDescription': item.orderAccessoryItemDescription,
            'itemQuantity': item.orderAccessoryItemQuantityRequiredPerPiece,
            'itemRate': item.orderAccessoryItemRate,
            'itemTotal': item.orderAccessoryItemQuantityRequiredPerPiece * item.orderAccessoryItemRate,
            'itemGroup': 'oa',
            'itemQuantityAccepted': null,
            'itemQuantitySubstanded': null,
            'itemQuantityRejected': null
        });
    };
    OrderPurchaseOrderComponent.prototype.getOrderAccessoriesLists = function (id) {
        var _this = this;
        this.orderPurchaseOrderService.getOrderAccessories(id)
            .subscribe(function (res) {
            console.log('getOrderAccessories', res);
            _this.accessoryToLoad.res = res;
            _this.accessoryToLoad.toLoad = [];
            console.log('this.accessoryToLoad.res', _this.accessoryToLoad);
            _this.accessoryToLoad.res.forEach(function (item, index) {
                console.log(item, index);
                _this.addItemGroup();
                _this.setTheAccessoryItemsArray(item);
                if (index == (_this.accessoryToLoad.res.length - 1)) {
                    _this.accessoryToLoad.toLoad.forEach(function (item, index) {
                        _this.itemsToLoad.push(item);
                    });
                    _this.myOrderPurchaseOrderForm.controls['items'].setValue(_this.itemsToLoad);
                    _this.calculateTotals();
                }
            });
        }, function (err) {
            console.log('getOrderAccessories', err);
        });
    };
    OrderPurchaseOrderComponent.prototype.setThePackerItemsArray = function (item) {
        this.packerToLoad.toLoad.push({
            'itemCode': item.orderPackingMaterialItemCode,
            'itemName': item.orderPackingMaterialItemName,
            'itemDescription': item.orderPackingMaterialDescription,
            'itemQuantity': item.orderPackingMaterialRequiredPerPiece,
            'itemRate': item.orderPackingMaterialRate,
            'itemTotal': item.orderPackingMaterialRequiredPerPiece * item.orderPackingMaterialRate,
            'itemGroup': 'op',
            'itemQuantityAccepted': null,
            'itemQuantitySubstanded': null,
            'itemQuantityRejected': null
        });
    };
    OrderPurchaseOrderComponent.prototype.getOrderPackersLists = function (id) {
        var _this = this;
        this.orderPurchaseOrderService.getOrderPackers(id)
            .subscribe(function (res) {
            console.log('getOrderPackers', res);
            _this.packerToLoad.res = res;
            _this.packerToLoad.toLoad = [];
            console.log('this.packerToLoad.res', _this.accessoryToLoad);
            _this.packerToLoad.res.forEach(function (item, index) {
                console.log(item, index);
                _this.addItemGroup();
                _this.setThePackerItemsArray(item);
                if (index == (_this.packerToLoad.res.length - 1)) {
                    _this.packerToLoad.toLoad.forEach(function (item, index) {
                        _this.itemsToLoad.push(item);
                    });
                    _this.myOrderPurchaseOrderForm.controls['items'].setValue(_this.itemsToLoad);
                    _this.calculateTotals();
                }
            });
        }, function (err) {
            console.log('getOrderPackers', err);
        });
    };
    // ===================================Sourcing Items End===========================================
    // ===================================Posting PO Start===========================================
    // ===================================Sourcing Items End===========================================
    // ===================================Posting PO Start===========================================
    OrderPurchaseOrderComponent.prototype.postPurchaseOrder = 
    // ===================================Sourcing Items End===========================================
    // ===================================Posting PO Start===========================================
    function (po) {
        var _this = this;
        console.log('post PO', po);
        this.myOrderPurchaseOrderForm.disable();
        this.orderPurchaseOrderService.postPurchaseOrder(this.aOrder.id, po)
            .subscribe(function (res) {
            console.log('postPurchaseOrder', res);
            _this.alert.success('Purchase Order Created Successfully');
            setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
        }, function (err) {
            console.log('postPurchaseOrder', err);
            _this.alert.error('Error Occured while Creating Purchase Order');
            _this.myOrderPurchaseOrderForm.enable();
        });
    };
    OrderPurchaseOrderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-purchase-order',
                    templateUrl: './order-purchase-order.component.html',
                    styleUrls: ['./order-purchase-order.component.scss']
                },] },
    ];
    // ===================================Posting PO End===========================================
    // getOrderFabricsLists(id) {
    //   this.orderPurchaseOrderService.getOrderFabrics(id)
    //     .subscribe(
    //       res => {
    //         console.log('getOrderFabrics', res);
    //         this.fabricToLoad.res = res;
    //         this.fabricToLoad.toLoad = [];
    //         console.log('this.fabricToLoad.res',this.fabricToLoad);
    //         this.fabricToLoad.res.forEach((item, index) => {
    //             console.log(item, index);
    //           if ( index == (this.fabricToLoad.res.length - 1) ) {
    //             console.log('index == length-1');
    //             this.setTheFabricItemsArray(item);
    //             console.log('this.fabricToLoad',this.fabricToLoad);
    //             this.fabricToLoad.toLoad.forEach((item, index) => {
    //               this.itemsToLoad.push(item);
    //             })
    //             this.myOrderPurchaseOrderForm.controls['items'].setValue(this.itemsToLoad);
    //             this.calculateTotals();
    //           }
    //           // Add New Item Group for more than one item in an array
    //           if ( index <= (this.fabricToLoad.res.length - 2) ) {
    //             console.log('index <= length-2');
    //             this.setTheFabricItemsArray(item);
    //             this.addItemGroup();
    //           }
    //         })
    //       },
    //       err => {
    //         console.log('getOrderFabrics', err);
    //       }
    //     )
    // }
    /** @nocollapse */
    OrderPurchaseOrderComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_purchase_order_service_1.OrderPurchaseOrderService, },
        { type: order_service_1.OrderService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderPurchaseOrderComponent;
}());
exports.OrderPurchaseOrderComponent = OrderPurchaseOrderComponent;
//# sourceMappingURL=order-purchase-order.component.js.map