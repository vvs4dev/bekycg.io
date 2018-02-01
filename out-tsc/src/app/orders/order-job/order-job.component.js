"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_service_1 = require("./../order.service");
var presets_service_1 = require("../../presets/presets.service");
var OrderJobComponent = /** @class */ (function () {
    function OrderJobComponent(user, orderService, presetsService, router, aRoute, alert, appComponent) {
        this.user = user;
        this.orderService = orderService;
        this.presetsService = presetsService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.orderJobReq = {};
        this.aOrder = {};
        this.params = {};
        this.edit = {};
    }
    OrderJobComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderJobForm = new forms_1.FormGroup({
            "orderNumber": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobCode": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobName": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobDescription": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            "orderJobCost": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id'),
        };
        // console.log('params', this.params);
        this.myOrderJobForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderService.findOrderJob(this.params.id)
                .subscribe(function (res) {
                // console.log('findOrderJob','this.edit', res);
                // console.log('findOrderJob','this.edit', res);
                _this.edit = res;
                _this.myOrderJobForm.controls['orderJobCode'].setValue(_this.edit.orderJobCode);
                _this.myOrderJobForm.controls['orderJobName'].setValue(_this.edit.orderJobName);
                _this.myOrderJobForm.controls['orderJobDescription'].setValue(_this.edit.orderJobDescription);
                _this.myOrderJobForm.controls['orderJobCost'].setValue(_this.edit.orderJobCost);
            });
        }
        this.getJobLists();
        this.orderJobId = new forms_1.FormControl();
        this.orderJobId.valueChanges
            .subscribe(function (term) {
            // console.log('term',term);
            // console.log('term',term);
            _this.myOrderJobForm.controls['orderJobCode'].setValue(JSON.parse(term).jobCode);
            _this.myOrderJobForm.controls['orderJobName'].setValue(JSON.parse(term).jobName);
            _this.myOrderJobForm.controls['orderJobCost'].setValue(JSON.parse(term).jobCost);
        });
    };
    OrderJobComponent.prototype.getJobLists = function () {
        var _this = this;
        this.presetsService.getAllJobs()
            .subscribe(function (res) {
            _this.jobsList = res;
            // console.log('this.jobsList',res);
        }, function (err) {
            // console.log('this.jobsList',err);
        });
    };
    OrderJobComponent.prototype.addOrderJob = function (orderJob) {
        var _this = this;
        // console.log('Job',orderJob);
        this.myOrderJobForm.disable();
        this.loading = true;
        // console.log('addOrderJob',orderJob);
        if (this.params.action == 'add') {
            this.orderService.postOrderJob(orderJob)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderJobForm.reset();
                _this.myOrderJobForm.enable();
                // console.log('addOrderJobResponse', res);
                // console.log('addOrderJobResponse', res);
                _this.alert.success('Job added to ' + _this.edit.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Creating Order');
                // console.log('addorderJobResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderService.putOrderJob(this.edit.id, orderJob)
                .subscribe(function (res) {
                _this.loading = false;
                _this.myOrderJobForm.reset();
                _this.myOrderJobForm.enable();
                // console.log('addOrderJobResponse', res);
                // console.log('addOrderJobResponse', res);
                _this.alert.success('Job updated in ' + _this.edit.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.alert.success('Error Ocuured while Creating Order');
                // console.log('addorderJobResponse', err);
            });
        }
    };
    OrderJobComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-job',
                    templateUrl: './order-job.component.html',
                    styleUrls: ['./order-job.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderJobComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_service_1.OrderService, },
        { type: presets_service_1.PresetsService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
    ]; };
    return OrderJobComponent;
}());
exports.OrderJobComponent = OrderJobComponent;
//# sourceMappingURL=order-job.component.js.map