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
var presets_service_1 = require("../../presets/presets.service");
var OrderPOComponent = /** @class */ (function () {
    function OrderPOComponent(user, orderService, presetsService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderService = orderService;
        this.presetsService = presetsService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.myBreadCrumb = {};
        this.params = {};
        this.PONumberExists = {};
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
        this.PONumberExists.status = false;
        this.today = new Date();
        this.itemsToLoad = [];
        this.myBreadCrumb.crumbs = [
            { 'menu': 'Orders', 'routerLink': '/orders' },
            { 'menu': this.aRoute.snapshot.paramMap.get('orderNumber'), 'routerLink': '' }
        ];
        this.myBreadCrumb.active = (this.aRoute.snapshot.paramMap.get('action') === 'add') ? 'New Purchase Order' : 'Edit Purchase Order';
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
        // console.log('this.materialList', this.materialList);
    }
    OrderPOComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderPOForm = new forms_1.FormGroup({
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
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'orderNumber': this.aRoute.snapshot.paramMap.get('orderNumber'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        // console.log('this.params', this.params);
        this.myOrderPOForm.controls['PODate'].setValue(this.orderService.formatDate(this.today));
        this.myOrderPOForm.controls['status'].setValue('ordered');
        this.myOrderPOForm.controls['orderNumber'].setValue(this.params.orderNumber);
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
                'vendorCode': JSON.parse(term).vendorCode,
                'vendorName': JSON.parse(term).vendorName
            };
            // console.log('vendor', this.vendor);
            // console.log('vendor', this.vendor);
            _this.myOrderPOForm.controls['vendor'].setValue(_this.vendor);
            _this.presetsService.getVendorContacts(JSON.parse(term).vendorCode)
                .subscribe(function (res) {
                // console.log('this.getVendorContactList', res);
                // console.log('this.getVendorContactList', res);
                _this.vendorContactsList = res;
            }, function (err) {
                // console.log('this.getVendorContactList', err);
            });
        });
        this.vendorContactId.valueChanges
            .subscribe(function (term) {
            _this.vendorContact = {
                'contactName': JSON.parse(term).contactName,
                'contactNumber': JSON.parse(term).contactNumber,
                'contactEmail': JSON.parse(term).contactEmail,
                'location': JSON.parse(term).location,
                'address': JSON.parse(term).address
            };
            // console.log('vendorContact', this.vendorContact);
            // console.log('vendorContact', this.vendorContact);
            _this.myOrderPOForm.controls['vendorContact'].setValue(_this.vendorContact);
        });
        this.loadFabric.valueChanges
            .subscribe(function (term) {
            // console.log('loadFabric',term);
            if (term) {
                _this.getOrderFabricsLists(_this.params.orderNumber);
            }
        });
        this.loadAccessories.valueChanges
            .subscribe(function (term) {
            // console.log('loadAccessories',term);
            if (term) {
                _this.getOrderAccessoriesLists(_this.params.orderNumber);
            }
        });
        this.loadPackers.valueChanges
            .subscribe(function (term) {
            // console.log('loadPackers',term);
            if (term) {
                _this.getOrderPackersLists(_this.params.orderNumber);
            }
        });
    };
    // ================================= Fetching the Basic Data ====================================
    // ================================= Fetching the Basic Data ====================================
    OrderPOComponent.prototype.getVendorLists = 
    // ================================= Fetching the Basic Data ====================================
    function () {
        var _this = this;
        this.presetsService.getAllVendors()
            .subscribe(function (res) {
            _this.vendorsList = res;
            // console.log('this.getVendorLists',res);
        }, function (err) {
            // console.log('this.getVendorLists',err);
        });
    };
    OrderPOComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.checkExistanceOrderNumber(orderNumber)
            .subscribe(function (res) {
            // console.log('findOrderNumber',res);
            // console.log('findOrderNumber',res);
            _this.aOrder = res;
        }, function (err) {
            // console.log('findOrderNumber',err);
        });
    };
    OrderPOComponent.prototype.validatePONumber = function (poNumber) {
        var _this = this;
        // console.log('PONumberChanged', poNumber);
        this.PONumberExists = {};
        this.orderService.validatePONumber(poNumber)
            .subscribe(function (res) {
            // console.log('validatePONumber',res);
            // console.log('validatePONumber',res);
            _this.PONumberExists = res;
            _this.PONumberExists.status = (_this.PONumberExists.count === 0) ? false : true;
            _this.myOrderPOForm.controls['PONumber'].setValue(poNumber);
        }, function (err) {
            // console.log('validatePONumber',err);
            // console.log('validatePONumber',err);
            _this.myOrderPOForm.controls['PONumber'].setValue(poNumber);
        });
    };
    // ===================================Items Group Start===========================================
    // ===================================Items Group Start===========================================
    OrderPOComponent.prototype.buildItemGroup = 
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
    OrderPOComponent.prototype.addItemGroup = function () {
        this.myOrderPOForm.get('items').push(this.buildItemGroup());
    };
    OrderPOComponent.prototype.removeItemGroup = function (i, item) {
        this.myOrderPOForm.get('items').removeAt(i);
        // console.log('removedItem', item);
        this.calculateTotals();
    };
    // ===================================Items Group End===========================================
    // ===================================Calculations Start===========================================
    // ===================================Items Group End===========================================
    // ===================================Calculations Start===========================================
    OrderPOComponent.prototype.calculateItemTotal = 
    // ===================================Items Group End===========================================
    // ===================================Calculations Start===========================================
    function (i, item) {
        if (item.itemQuantity && item.itemRate) {
            this.aItem = item;
            // console.log('this.aItem', this.aItem);
            this.aItem.itemTotal = this.aItem.itemQuantity * this.aItem.itemRate;
            this.calculateTotals();
        }
    };
    OrderPOComponent.prototype.calculateTotals = function () {
        var _this = this;
        this.subtotals = 0;
        this.itemsToLoad = this.myOrderPOForm.controls.items.value;
        // console.log('calculateTotals',this.itemsToLoad);
        this.itemsToLoad.forEach(function (item, index) {
            _this.subtotals += item.itemTotal;
            // console.log('calculatedsubtotal', this.subtotals);
        });
        this.myOrderPOForm.controls.subtotal.setValue(this.subtotals);
        this.myOrderPOForm.controls.tax.setValue(parseInt(this.myOrderPOForm.controls.subtotal.value) * 18 / 100);
        this.myOrderPOForm.controls.total.setValue(parseInt(this.myOrderPOForm.controls.subtotal.value) + parseInt(this.myOrderPOForm.controls.tax.value));
    };
    // ===================================Calculations End===========================================
    // ===================================Sourcing Items End===========================================
    // ===================================Calculations End===========================================
    // ===================================Sourcing Items End===========================================
    OrderPOComponent.prototype.setTheFabricItemsArray = 
    // ===================================Calculations End===========================================
    // ===================================Sourcing Items End===========================================
    function (item) {
        this.fabricToLoad.toLoad.push({
            'itemCode': item.orderFabric.fabricCode,
            'itemName': item.orderFabric.fabricName,
            'itemDescription': item.orderFabric.fabricType + ',' + item.orderFabricColor,
            'itemQuantity': item.orderFabricRequired,
            'itemRate': item.orderFabricCost,
            'itemTotal': item.orderFabricRequired * item.orderFabricCost,
            'itemGroup': 'of',
            'itemQuantityAccepted': null,
            'itemQuantitySubstanded': null,
            'itemQuantityRejected': null
        });
        // console.log('setTheFabricItemsArray',this.fabricToLoad.toLoad);
    };
    OrderPOComponent.prototype.getOrderFabricsLists = function (id) {
        var _this = this;
        this.orderService.getOrderFabrics(id)
            .subscribe(function (res) {
            // console.log('getOrderFabrics', res);
            // console.log('getOrderFabrics', res);
            _this.fabricToLoad.res = res;
            _this.fabricToLoad.toLoad = [];
            // console.log('this.fabricToLoad.res',this.fabricToLoad);
            // console.log('this.fabricToLoad.res',this.fabricToLoad);
            _this.fabricToLoad.res.forEach(function (item, index) {
                // console.log('fabric -index',index);
                // console.log('fabric -index',index);
                _this.addItemGroup();
                _this.setTheFabricItemsArray(item);
                if (index === (_this.fabricToLoad.res.length - 1)) {
                    _this.fabricToLoad.toLoad.forEach(function (item, index) {
                        _this.itemsToLoad.push(item);
                    });
                    _this.myOrderPOForm.controls['items'].setValue(_this.itemsToLoad);
                    _this.calculateTotals();
                }
            });
        }, function (err) {
            // console.log('getOrderFabrics', err);
        });
    };
    OrderPOComponent.prototype.setTheAccessoryItemsArray = function (item) {
        this.accessoryToLoad.toLoad.push({
            'itemCode': item.orderAccessoryCode,
            'itemName': item.orderAccessoryName,
            'itemDescription': item.orderAccessoryDescription,
            'itemQuantity': item.orderAccessoryQuantityRequiredPerPiece,
            'itemRate': item.orderAccessoryCost,
            'itemTotal': item.orderAccessoryQuantityRequiredPerPiece * item.orderAccessoryCost,
            'itemGroup': 'oa',
            'itemQuantityAccepted': null,
            'itemQuantitySubstanded': null,
            'itemQuantityRejected': null
        });
    };
    OrderPOComponent.prototype.getOrderAccessoriesLists = function (id) {
        var _this = this;
        this.orderService.getOrderAccessories(id)
            .subscribe(function (res) {
            // console.log('getOrderAccessories', res);
            // console.log('getOrderAccessories', res);
            _this.accessoryToLoad.res = res;
            _this.accessoryToLoad.toLoad = [];
            // console.log('this.accessoryToLoad.res',this.accessoryToLoad);
            // console.log('this.accessoryToLoad.res',this.accessoryToLoad);
            _this.accessoryToLoad.res.forEach(function (item, index) {
                // console.log(item, index);
                // console.log(item, index);
                _this.addItemGroup();
                _this.setTheAccessoryItemsArray(item);
                if (index === (_this.accessoryToLoad.res.length - 1)) {
                    _this.accessoryToLoad.toLoad.forEach(function (item, index) {
                        _this.itemsToLoad.push(item);
                    });
                    _this.myOrderPOForm.controls['items'].setValue(_this.itemsToLoad);
                    _this.calculateTotals();
                }
            });
        }, function (err) {
            // console.log('getOrderAccessories', err);
        });
    };
    OrderPOComponent.prototype.setThePackerItemsArray = function (item) {
        this.packerToLoad.toLoad.push({
            'itemCode': item.orderPackerCode,
            'itemName': item.orderPackerName,
            'itemDescription': item.orderPackerDescription,
            'itemQuantity': item.orderPackerQuantityRequiredPerPiece,
            'itemRate': item.orderPackerCost,
            'itemTotal': item.orderPackerQuantityRequiredPerPiece * item.orderPackerCost,
            'itemGroup': 'op',
            'itemQuantityAccepted': null,
            'itemQuantitySubstanded': null,
            'itemQuantityRejected': null
        });
    };
    OrderPOComponent.prototype.getOrderPackersLists = function (id) {
        var _this = this;
        this.orderService.getOrderPackers(id)
            .subscribe(function (res) {
            // console.log('getOrderPackers', res);
            // console.log('getOrderPackers', res);
            _this.packerToLoad.res = res;
            _this.packerToLoad.toLoad = [];
            // console.log('this.packerToLoad.res',this.accessoryToLoad);
            // console.log('this.packerToLoad.res',this.accessoryToLoad);
            _this.packerToLoad.res.forEach(function (item, index) {
                // console.log(item, index);
                // console.log(item, index);
                _this.addItemGroup();
                _this.setThePackerItemsArray(item);
                if (index === (_this.packerToLoad.res.length - 1)) {
                    _this.packerToLoad.toLoad.forEach(function (item, index) {
                        _this.itemsToLoad.push(item);
                    });
                    _this.myOrderPOForm.controls['items'].setValue(_this.itemsToLoad);
                    _this.calculateTotals();
                }
            });
        }, function (err) {
            // console.log('getOrderPackers', err);
        });
    };
    // ===================================Sourcing Items End===========================================
    // ===================================Posting PO Start===========================================
    // ===================================Sourcing Items End===========================================
    // ===================================Posting PO Start===========================================
    OrderPOComponent.prototype.postPurchaseOrder = 
    // ===================================Sourcing Items End===========================================
    // ===================================Posting PO Start===========================================
    function (po) {
        var _this = this;
        // console.log('post PO', po);
        this.myOrderPOForm.disable();
        this.orderService.postPurchaseOrder(this.params.orderNumber, po)
            .subscribe(function (res) {
            // console.log('postPurchaseOrder', res);
            // console.log('postPurchaseOrder', res);
            _this.alert.success('Purchase Order Created Successfully');
            setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
        }, function (err) {
            // console.log('postPurchaseOrder', err);
            // console.log('postPurchaseOrder', err);
            _this.alert.error('Error Occured while Creating Purchase Order');
            _this.myOrderPOForm.enable();
        });
    };
    OrderPOComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-po',
                    templateUrl: './order-po.component.html',
                    styleUrls: ['./order-po.component.scss']
                },] },
    ];
    // ===================================Posting PO End===========================================
    /** @nocollapse */
    OrderPOComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_service_1.OrderService, },
        { type: presets_service_1.PresetsService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderPOComponent;
}());
exports.OrderPOComponent = OrderPOComponent;
//# sourceMappingURL=order-po.component.js.map