"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_service_1 = require("./../_services/alert.service");
var app_component_1 = require("./../app.component");
var core_1 = require("@angular/core");
var order_service_1 = require("./order.service");
var pager_service_1 = require("./../_services/pager.service");
var router_1 = require("@angular/router");
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent(appComponent, orderService, alert, pagerService, router) {
        this.appComponent = appComponent;
        this.orderService = orderService;
        this.alert = alert;
        this.pagerService = pagerService;
        this.router = router;
        this.myBreadCrumb = {};
        // array of all items to be paged
        this.allItems = [];
        // pager object
        this.pager = {};
        // paged items
        this.pagedOrderItems = [];
        this.myBreadCrumb.crumbs = [
            { "menu": "Home", "routerLink": "/" }
        ];
        this.myBreadCrumb.active = 'Orders';
        this.noOfItemsinPage = 5;
        this.loading = '';
    }
    OrdersComponent.prototype.ngOnInit = function () {
        if (this.orderService.getActiveOrder()) {
            this.aOrder = this.orderService.getActiveOrder();
            // console.log('Loading active Order',this.aOrder);
            this.fetchOrderDetails(this.aOrder);
        }
        this.fetchAllOrders();
    };
    OrdersComponent.prototype.fetchAllOrders = function () {
        var _this = this;
        this.loading = 'getOrders';
        this.orderService.getAllOrders()
            .subscribe(function (res) {
            // console.log('getAllOrders-Response',res);
            // console.log('getAllOrders-Response',res);
            _this.orders = res;
            _this.allItems = res;
            _this.setPage(1);
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
    OrdersComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.noOfItemsinPage);
        // get current page of items
        this.pagedOrderItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    OrdersComponent.prototype.editOrderEntry = function (order) {
        // console.log('editOrderEntry',order)
        this.router.navigate(['/order/entry/edit/' + order.orderNumber]);
    };
    OrdersComponent.prototype.editFabric = function (fabric) {
        // console.log('editFabric', fabric);
        this.router.navigate(['/order/' + fabric.orderNumber + '/fabrics/edit/' + fabric.id]);
    };
    OrdersComponent.prototype.editJob = function (job) {
        // console.log('editJob', job);
        this.router.navigate(['/order/' + job.orderNumber + '/jobs/edit/' + job.id]);
    };
    OrdersComponent.prototype.editAccessory = function (accessory) {
        // console.log('editAccessory', accessory);
        this.router.navigate(['/order/' + accessory.orderNumber + '/accessories/edit/' + accessory.id]);
    };
    OrdersComponent.prototype.editPacker = function (packer) {
        // console.log('editPacker', packer);
        this.router.navigate(['/order/' + packer.orderNumber + '/packers/edit/' + packer.id]);
    };
    OrdersComponent.prototype.fetchOrderDetails = function (order) {
        // console.log('order', order);
        this.aOrder = order;
        this.orderService.setActiveOrder(order);
        this.getOrderFabrics(order.orderNumber);
        this.getOrderJobs(order.orderNumber);
        this.getOrderAccessories(order.orderNumber);
        this.getOrderPackers(order.orderNumber);
        this.getOrderPurchaseOrders(order.orderNumber);
        this.getOrderGRNs(order.orderNumber);
    };
    OrdersComponent.prototype.getOrderFabrics = function (orderNumber) {
        var _this = this;
        // console.log('fetchOrderFabrics');
        this.loading = 'fetchOrderFabrics';
        this.orderService.getOrderFabrics(orderNumber)
            .subscribe(function (res) {
            // console.log('fetchOrderFabrics-Response',res);
            // console.log('fetchOrderFabrics-Response',res);
            _this.orderFabrics = res;
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
    OrdersComponent.prototype.getOrderJobs = function (orderNumber) {
        var _this = this;
        // console.log('fetchOrderJobs');
        this.loading = 'fetchOrderJobs';
        this.orderService.getOrderJobs(orderNumber)
            .subscribe(function (res) {
            // console.log('fetchOrderJobs-Response',res);
            // console.log('fetchOrderJobs-Response',res);
            _this.orderJobs = res;
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
    OrdersComponent.prototype.addNewJob = function () {
        this.router.navigate(['/order/' + this.aOrder.orderNumber + '/jobs/add/new']);
    };
    OrdersComponent.prototype.getOrderAccessories = function (orderNumber) {
        var _this = this;
        // console.log('fetchOrderAccessories');
        this.loading = 'fetchOrderAccessories';
        this.orderService.getOrderAccessories(orderNumber)
            .subscribe(function (res) {
            // console.log('fetchOrderAccessories-Response',res);
            // console.log('fetchOrderAccessories-Response',res);
            _this.orderAccessories = res;
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
    OrdersComponent.prototype.addNewAccessory = function () {
        this.router.navigate(['/order/' + this.aOrder.orderNumber + '/accessories/add/new']);
    };
    OrdersComponent.prototype.getOrderPackers = function (orderNumber) {
        var _this = this;
        // console.log('fetchOrderPackers');
        this.loading = 'fetchOrderPackers';
        this.orderService.getOrderPackers(orderNumber)
            .subscribe(function (res) {
            // console.log('fetchOrderPackers-Response',res);
            // console.log('fetchOrderPackers-Response',res);
            _this.orderPackers = res;
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
    OrdersComponent.prototype.addNewPacker = function () {
        this.router.navigate(['/order/' + this.aOrder.orderNumber + '/packers/add/new']);
    };
    OrdersComponent.prototype.getOrderPurchaseOrders = function (orderNumber) {
        var _this = this;
        // console.log('fetchOrderPurchaseOrders');
        this.loading = 'fetchOrderPurchaseOrders';
        this.orderService.getOrderPurchaseOrders(orderNumber)
            .subscribe(function (res) {
            // console.log('fetchOrderPurchaseOrders-Response',res);
            // console.log('fetchOrderPurchaseOrders-Response',res);
            _this.purchaseOrders = res;
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('err',err);
            // console.log('err',err);
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
    OrdersComponent.prototype.getOrderGRNs = function (orderNumber) {
        var _this = this;
        // console.log('fetchOrderGRNs');
        this.loading = 'fetchOrderGRNs';
        this.orderService.getOrderGRNs(orderNumber)
            .subscribe(function (res) {
            // console.log('fetchOrderGRNs-Response',res);
            // console.log('fetchOrderGRNs-Response',res);
            _this.orderGRNs = res;
            _this.loading = '';
        }, function (err) {
            _this.loading = false;
            // console.log('fetchOrderGRNs-Response',err);
            // console.log('fetchOrderGRNs-Response',err);
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
    OrdersComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-orders',
                    templateUrl: './orders.component.html',
                    styleUrls: ['./orders.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrdersComponent.ctorParameters = function () { return [
        { type: app_component_1.AppComponent, },
        { type: order_service_1.OrderService, },
        { type: alert_service_1.AlertService, },
        { type: pager_service_1.PagerService, },
        { type: router_1.Router, },
    ]; };
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=orders.component.js.map