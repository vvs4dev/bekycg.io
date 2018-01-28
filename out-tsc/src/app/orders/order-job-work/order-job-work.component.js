"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_job_work_service_1 = require("./order-job-work.service");
var order_service_1 = require("./../order.service");
var OrderJobWorkComponent = /** @class */ (function () {
    function OrderJobWorkComponent(user, orderJobWorkService, orderService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderJobWorkService = orderJobWorkService;
        this.orderService = orderService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.orderJobworkReq = {};
        this.aOrder = {};
        this.params = {};
        this.edit = {};
    }
    OrderJobWorkComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderJobworkForm = new forms_1.FormGroup({
            "orderNumber": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobworkCode": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobworkName": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobworkDescription": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobworkRate": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id'),
        };
        this.findOrderNumber(this.params.orderNumber);
        console.log('params', this.params);
        this.myOrderJobworkForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderJobWorkService.findOrderJobwork(this.params.id)
                .subscribe(function (res) {
                console.log('findOrderJobwork', 'this.edit', res);
                _this.edit = res;
                _this.myOrderJobworkForm.controls['orderJobworkCode'].setValue(_this.edit.orderJobworkCode);
                _this.myOrderJobworkForm.controls['orderJobworkName'].setValue(_this.edit.orderJobworkName);
                _this.myOrderJobworkForm.controls['orderJobworkDescription'].setValue(_this.edit.orderJobworkDescription);
                _this.myOrderJobworkForm.controls['orderJobworkRate'].setValue(_this.edit.orderJobworkRate);
            });
        }
        this.getJobworkLists();
        this.orderJobworkId = new forms_1.FormControl();
        this.orderJobworkId.valueChanges
            .subscribe(function (term) {
            console.log('term', term);
            _this.myOrderJobworkForm.controls['orderJobworkCode'].setValue(JSON.parse(term).jobworkCode);
            _this.myOrderJobworkForm.controls['orderJobworkName'].setValue(JSON.parse(term).jobworkName);
            _this.myOrderJobworkForm.controls['orderJobworkRate'].setValue(JSON.parse(term).jobworkRate);
        });
    };
    OrderJobWorkComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.findOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            console.log('findOrderNumber', res);
        }, function (err) {
            console.log('findOrderNumber', err);
        });
    };
    OrderJobWorkComponent.prototype.getJobworkLists = function () {
        var _this = this;
        this.orderJobWorkService.getJobworksList()
            .subscribe(function (res) {
            _this.jobworksList = res;
            console.log('this.jobworksList', res);
        }, function (err) {
            console.log('this.jobworksList', err);
        });
    };
    OrderJobWorkComponent.prototype.addOrderJobwork = function (orderJobwork) {
        var _this = this;
        console.log('jobwork', orderJobwork);
        this.myOrderJobworkForm.disable();
        this.loading = true;
        console.log('addOrderJobwork', orderJobwork);
        if (this.params.action == 'add') {
            this.orderJobWorkService.postOrderJobwork(this.orderDetails.id, orderJobwork)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderJobworkForm.reset();
                _this.myOrderJobworkForm.enable();
                console.log('addOrderJobworkResponse', res);
                _this.alert.success('Jobwork added to ' + _this.edit.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Creating Order');
                console.log('addorderJobworkResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderJobWorkService.patchOrderJobwork(this.edit.id, orderJobwork)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderJobworkForm.reset();
                _this.myOrderJobworkForm.enable();
                console.log('addOrderJobworkResponse', res);
                _this.alert.success('Jobwork updated in ' + _this.edit.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Creating Order');
                console.log('addorderJobworkResponse', err);
            });
        }
    };
    OrderJobWorkComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-job-work',
                    templateUrl: './order-job-work.component.html',
                    styleUrls: ['./order-job-work.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderJobWorkComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_job_work_service_1.OrderJobWorkService, },
        { type: order_service_1.OrderService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderJobWorkComponent;
}());
exports.OrderJobWorkComponent = OrderJobWorkComponent;
//# sourceMappingURL=order-job-work.component.js.map