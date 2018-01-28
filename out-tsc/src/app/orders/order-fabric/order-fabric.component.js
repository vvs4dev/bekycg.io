"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ngxf_uploader_1 = require("ngxf-uploader");
var user_service_1 = require("./../../_services/user.service");
var alert_service_1 = require("./../../_services/alert.service");
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var order_fabrics_service_1 = require("./order-fabrics.service");
var order_service_1 = require("./../order.service");
var OrderFabricComponent = /** @class */ (function () {
    function OrderFabricComponent(user, orderFabricsService, orderService, router, aRoute, alert, appComponent, ngxUpload, changeDetectorRef) {
        this.user = user;
        this.orderFabricsService = orderFabricsService;
        this.orderService = orderService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.ngxUpload = ngxUpload;
        this.changeDetectorRef = changeDetectorRef;
        this.params = {};
        this.orderDetails = {};
        this.orderFabricReq = {};
        this.process = [];
        this.uploadStatus = {};
        this.orderFabricMaterial = {};
        this.orderFabricSamples = [];
        this.file_srcs = [];
        this.debug_size_before = [];
        this.debug_size_after = [];
        this.myBreadCrumb = [
            { "menu": "Home", "routerLink": "/" },
            { "menu": "Orders", "routerLink": "/orders" }
            // {"menu" : "Orders", "routerLink" : "/orders"}
        ];
        this.appComponent.setActiveBreadcrumb('Fabrics', this.myBreadCrumb);
    }
    OrderFabricComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderFabricForm = new forms_1.FormGroup({
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricMaterial': new forms_1.FormGroup({
                "fabricMaterialName": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
                "fabricMaterialWeight": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
                "fabricMaterialType": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
                "fabricMaterialCode": new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
            }),
            'orderFabricCount': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricConstruction': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricColor': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricSample': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricSpecialTreatment': new forms_1.FormArray([this.buildSpecialTreatmentComponent()]),
            'orderFabricRequired': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricRate': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'treatmentDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.getFabricLists();
        this.getTreatmentLists();
        this.orderFabricReq = this.orderFabricsService.getOrderFabricReq();
        this.params = {
            "action": this.aRoute.snapshot.paramMap.get('action'),
            "orderNumber": this.aRoute.snapshot.paramMap.get('orderNumber'),
            "id": this.aRoute.snapshot.paramMap.get('id')
        };
        console.log('params', this.params);
        this.findOrderNumber(this.params.orderNumber);
        this.myOrderFabricForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action == 'edit') {
            this.orderFabricsService.findOrderFabric(this.params.id)
                .subscribe(function (res) {
                console.log('findOrderFabric', 'this.edit', res);
                _this.edit = res;
                _this.myOrderFabricForm.controls['orderFabricCode'].setValue(_this.edit.orderFabricCode);
                _this.myOrderFabricForm.controls['orderFabricColor'].setValue(_this.edit.orderFabricColor);
                _this.myOrderFabricForm.controls['orderFabricConstruction'].setValue(_this.edit.orderFabricConstruction);
                _this.myOrderFabricForm.controls['orderFabricCount'].setValue(_this.edit.orderFabricCount);
                _this.myOrderFabricForm.controls['orderFabricMaterial'].setValue(_this.edit.orderFabricMaterial);
                _this.myOrderFabricForm.controls['orderFabricRate'].setValue(_this.edit.orderFabricRate);
                _this.myOrderFabricForm.controls['orderFabricRequired'].setValue(_this.edit.orderFabricRequired);
                _this.myOrderFabricForm.controls['orderFabricSample'].setValue(_this.edit.orderFabricSample);
                _this.myOrderFabricForm.controls['treatmentDescription'].setValue(_this.edit.treatmentDescription);
                _this.edit.orderFabricSpecialTreatment.forEach(function (item, index) {
                    console.log(item, index);
                    if (index == (_this.edit.orderFabricSpecialTreatment.length - 1)) {
                        _this.myOrderFabricForm.controls['orderFabricSpecialTreatment'].setValue(_this.edit.orderFabricSpecialTreatment);
                    }
                    if (index <= (_this.edit.orderFabricSpecialTreatment.length - 2)) {
                        _this.addSpecialTreatmentComponent();
                    }
                });
            }, function (err) {
                _this.alert.error('Error Occured while Fetching Data');
            });
        }
        this.orderFabricMaterialId = new forms_1.FormControl();
        this.orderFabricMaterialId.valueChanges
            .subscribe(function (term) {
            _this.orderFabricMaterial = {
                "fabricMaterialName": JSON.parse(term).fabricMaterialName,
                "fabricMaterialWeight": JSON.parse(term).fabricMaterialWeight,
                "fabricMaterialType": JSON.parse(term).fabricMaterialType,
                "fabricMaterialCode": JSON.parse(term).fabricMaterialCode
            };
            console.log('this.orderFabricMaterial', _this.orderFabricMaterial);
            _this.myOrderFabricForm.controls['orderFabricMaterial'].setValue(_this.orderFabricMaterial);
            _this.myOrderFabricForm.controls['orderFabricCode'].setValue(_this.orderFabricMaterial.fabricMaterialCode);
        });
    };
    OrderFabricComponent.prototype.findOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.findOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            console.log('findOrderNumber', 'this.orderDetails', _this.orderDetails);
        }, function (err) {
            console.log('findOrderNumber', err);
        });
    };
    OrderFabricComponent.prototype.addOrderFabric = function (orderFabric) {
        var _this = this;
        this.myOrderFabricForm.disable();
        this.loading = 'postFabric';
        console.log('addOrderFabric', this.orderDetails, orderFabric);
        if (this.params.action == 'add') {
            this.orderFabricsService.postOrderFabric(this.orderDetails, orderFabric)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrderFabricForm.reset();
                _this.myOrderFabricForm.enable();
                console.log('addOrderFabricResponse', res);
                _this.alert.success('Fabric added to ' + _this.orderDetails.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.loading = '';
                _this.alert.error('Error Occured while adding fabric to Order ' + _this.orderDetails.orderNumber);
                console.log('addOrderFabricResponse', err);
            });
        }
        else if (this.params.action == 'edit') {
            this.orderFabricsService.patchOrderFabric(this.edit.id, orderFabric)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrderFabricForm.reset();
                _this.myOrderFabricForm.enable();
                console.log('patchOrderFabricResponse', res);
                _this.alert.success('Fabric updated in ' + _this.orderDetails.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.loading = '';
                _this.alert.error('Error Occured while updated fabric in Order ' + _this.orderDetails.orderNumber);
                console.log('patchOrderFabricResponse', err);
            });
        }
    };
    OrderFabricComponent.prototype.getFabricLists = function () {
        var _this = this;
        this.orderFabricsService.getFabricsList()
            .subscribe(function (res) {
            _this.fabricsList = res;
            console.log('getFabricsList', res);
        }, function (err) {
            console.log('getFabricsList', err);
        });
    };
    OrderFabricComponent.prototype.getTreatmentLists = function () {
        var _this = this;
        this.orderFabricsService.getTreatmentsList()
            .subscribe(function (res) {
            _this.treatmentsList = res;
            console.log('getTreatmentsList', res);
        }, function (err) {
            console.log('getTreatmentsList', err);
        });
    };
    OrderFabricComponent.prototype.buildSpecialTreatmentComponent = function () {
        return new forms_1.FormControl('', [forms_1.Validators.required]);
    };
    OrderFabricComponent.prototype.removeSpecialTreatmentComponent = function (i) {
        this.myOrderFabricForm.get('orderFabricSpecialTreatment').removeAt(i);
    };
    OrderFabricComponent.prototype.addSpecialTreatmentComponent = function () {
        this.myOrderFabricForm.get('orderFabricSpecialTreatment').push(new forms_1.FormControl(''));
    };
    // non-multiple, return File
    // non-multiple, return File
    OrderFabricComponent.prototype.uploadFile = 
    // non-multiple, return File
    function (file) {
        var _this = this;
        console.log('File', file);
        // file.name = this.
        if (!(file instanceof File)) {
            this.alertError(file);
            return;
        }
        this.ngxUpload.upload({
            url: this.orderFabricReq.baseURL + '/OrderSampleImageContainers/' + this.orderDetails.id + '/upload' + this.orderFabricReq.authReq,
            headers: new http_1.HttpHeaders(),
            params: new http_1.HttpParams(),
            fields: {
                toUrl: 'device'
            },
            filesKey: ['MMSUploadFile'],
            files: file
        }).subscribe(function (event) {
            if (event.status === ngxf_uploader_1.UploadStatus.Uploading) {
                _this.uploadStatus.inference = "Uploading ...";
                _this.uploadStatus.percentage = event.percent;
                console.log(event.percent);
            }
            else {
                console.log(event);
            }
        }, function (err) {
            _this.uploadStatus.inference = "Upload Failed";
            console.log(err);
        }, function () {
            _this.uploadStatus.inference = "Successfully Uploaded";
            console.log('complete');
        });
    };
    // multiple, return FileList
    // multiple, return FileList
    OrderFabricComponent.prototype.uploadFileList = 
    // multiple, return FileList
    function (files) {
        var _this = this;
        console.log('File', files);
        this.readFiles(files);
        if (!(files instanceof Array)) {
            this.alertError(files);
            return;
        }
        else if (files instanceof Array) {
            files.forEach(function (item, index) {
                _this.orderFabricSamples.push('/OrderSampleImageContainers/' + _this.params.orderNumber + '/download/' + item.name);
                console.log(item.name); // 9, 2, 5
                console.log(index, files.length, _this.orderFabricSamples); // 0, 1, 2
            });
        }
        this.ngxUpload.upload({
            url: this.orderFabricReq.baseURL + '/OrderSampleImageContainers/' + this.params.orderNumber + '/upload' + this.orderFabricReq.authReq,
            headers: {},
            params: {},
            fields: {
                toUrl: 'device'
            },
            files: files,
            // filesKey: ['MMSUploadFile', 'aaa', 'bbb'],
            filesKey: ['MMSUploadFile'],
            process: true
        }).subscribe(function (event) {
            _this.uploadStatus.inference = "Uploading";
            _this.uploadStatus.percentage = event.percent;
            console.log(event);
        }, function (err) {
            _this.uploadStatus.inference = "Upload Failed";
            console.log(err);
        }, function () {
            _this.uploadStatus.inference = "Successfully Uploaded";
            _this.myOrderFabricForm.controls['orderFabricSample'].setValue(_this.orderFabricSamples);
            console.log('complete');
        });
    };
    OrderFabricComponent.prototype.alertError = function (msg) {
        switch (msg) {
            case ngxf_uploader_1.FileError.NumError:
                alert('Number Error');
                break;
            case ngxf_uploader_1.FileError.SizeError:
                alert('Size Error');
                break;
            case ngxf_uploader_1.FileError.TypeError:
                alert('Type Error');
                break;
        }
    };
    OrderFabricComponent.prototype.readFile = function (file, reader, callback) {
        // Set a callback funtion to fire after the file is fully loaded
        reader.onload = function () {
            // callback with the results
            callback(reader.result);
        };
        // Read the file
        reader.readAsDataURL(file);
    };
    OrderFabricComponent.prototype.readFiles = function (files, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        // Create the file reader
        var reader = new FileReader();
        // If there is a file
        if (index in files) {
            // Start reading this file
            this.readFile(files[index], reader, function (result) {
                // Create an img element and add the image file data to it
                var img = document.createElement("img");
                img.src = result;
                // Send this img to the resize function (and wait for callback)
                // Send this img to the resize function (and wait for callback)
                _this.resize(img, 250, 250, function (resized_jpeg, before, after) {
                    // For debugging (size in bytes before and after)
                    // For debugging (size in bytes before and after)
                    _this.debug_size_before.push(before);
                    _this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview
                    // This is also the file you want to upload. (either as a
                    // base64 string or img.src = resized_jpeg if you prefer a file).
                    // Add the resized jpeg img source to a list for preview
                    // This is also the file you want to upload. (either as a
                    // base64 string or img.src = resized_jpeg if you prefer a file). 
                    _this.file_srcs.push(resized_jpeg);
                    // Read the next file;
                    // Read the next file;
                    _this.readFiles(files, index + 1);
                });
            });
        }
        else {
            // When all files are done This forces a change detection
            this.changeDetectorRef.detectChanges();
        }
    };
    OrderFabricComponent.prototype.resize = function (img, MAX_WIDTH, MAX_HEIGHT, callback) {
        // This will wait until the img is loaded before calling this function
        return img.onload = function () {
            console.log("img loaded");
            // Get the images current width and height
            var width = img.width;
            var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions)
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            }
            else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            // create a canvas object
            var canvas = document.createElement("canvas");
            // Set the canvas to the new calculated dimensions
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg
            // IMPORTANT: 'jpeg' NOT 'jpg'
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    };
    OrderFabricComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-order-fabric',
                    templateUrl: './order-fabric.component.html',
                    styleUrls: ['./order-fabric.component.scss']
                },] },
    ];
    /** @nocollapse */
    OrderFabricComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: order_fabrics_service_1.OrderFabricsService, },
        { type: order_service_1.OrderService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: alert_service_1.AlertService, },
        { type: app_component_1.AppComponent, },
        { type: ngxf_uploader_1.NgxfUploaderService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return OrderFabricComponent;
}());
exports.OrderFabricComponent = OrderFabricComponent;
//# sourceMappingURL=order-fabric.component.js.map