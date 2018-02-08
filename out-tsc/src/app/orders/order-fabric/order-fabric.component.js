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
var order_service_1 = require("./../order.service");
var presets_service_1 = require("./../../presets/presets.service");
var app_config_provider_1 = require("../../app-config.provider");
var OrderFabricComponent = /** @class */ (function () {
    function OrderFabricComponent(user, orderService, presetsService, appConfig, router, aRoute, alert, appComponent, ngxUpload, changeDetectorRef) {
        this.user = user;
        this.orderService = orderService;
        this.presetsService = presetsService;
        this.appConfig = appConfig;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = alert;
        this.appComponent = appComponent;
        this.ngxUpload = ngxUpload;
        this.changeDetectorRef = changeDetectorRef;
        this.myBreadCrumb = {};
        this.params = {};
        this.orderDetails = {};
        this.process = [];
        this.uploadStatus = {};
        this.orderFabric = {};
        this.orderFabricSamples = [];
        this.file_srcs = [];
        this.debug_size_before = [];
        this.debug_size_after = [];
        this.params = {
            'action': this.aRoute.snapshot.paramMap.get('action'),
            'orderNumber': this.aRoute.snapshot.paramMap.get('orderNumber'),
            'id': this.aRoute.snapshot.paramMap.get('id')
        };
        // console.log('params', this.params);
        this.validateOrderNumber(this.params.orderNumber);
        this.myBreadCrumb.crumbs = [
            { 'menu': 'Orders', 'routerLink': '/orders' },
            { 'menu': this.params.orderNumber, 'routerLink': '/orders' },
        ];
        this.myBreadCrumb.active = (this.aRoute.snapshot.paramMap.get('action') === 'add') ? 'Add Fabric' : 'Edit Fabric';
    }
    OrderFabricComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Form Settings
        this.myOrderFabricForm = new forms_1.FormGroup({
            'orderNumber': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabric': new forms_1.FormGroup({
                'fabricName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
                'fabricWeight': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
                'fabricType': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
                'fabricCode': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
            }),
            'orderFabricCount': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricConstruction': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricColor': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricSample': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricTreatment': new forms_1.FormArray([this.buildSpecialTreatmentComponent()]),
            'orderFabricRequired': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'orderFabricCost': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'treatmentDescription': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
        this.getFabricLists();
        this.getTreatmentLists();
        this.myOrderFabricForm.controls['orderNumber'].setValue(this.params.orderNumber);
        if (this.params.action === 'edit') {
            this.orderService.findOrderFabric(this.params.id)
                .subscribe(function (res) {
                // console.log('findOrderFabric','this.edit', res);
                // console.log('findOrderFabric','this.edit', res);
                _this.edit = res;
                _this.myOrderFabricForm.controls['orderFabricCode'].setValue(_this.edit.orderFabricCode);
                _this.myOrderFabricForm.controls['orderFabricColor'].setValue(_this.edit.orderFabricColor);
                _this.myOrderFabricForm.controls['orderFabricConstruction'].setValue(_this.edit.orderFabricConstruction);
                _this.myOrderFabricForm.controls['orderFabricCount'].setValue(_this.edit.orderFabricCount);
                _this.myOrderFabricForm.controls['orderFabric'].setValue(_this.edit.orderFabric);
                _this.myOrderFabricForm.controls['orderFabricCost'].setValue(_this.edit.orderFabricCost);
                _this.myOrderFabricForm.controls['orderFabricRequired'].setValue(_this.edit.orderFabricRequired);
                _this.myOrderFabricForm.controls['orderFabricSample'].setValue(_this.edit.orderFabricSample);
                _this.myOrderFabricForm.controls['treatmentDescription'].setValue(_this.edit.treatmentDescription);
                _this.edit.orderFabricTreatment.forEach(function (item, index) {
                    // console.log(item, index);
                    if (index === (_this.edit.orderFabricTreatment.length - 1)) {
                        _this.myOrderFabricForm.controls['orderFabricTreatment'].setValue(_this.edit.orderFabricTreatment);
                    }
                    if (index <= (_this.edit.orderFabricTreatment.length - 2)) {
                        _this.addSpecialTreatmentComponent();
                    }
                });
            }, function (err) {
                _this.alert.error('Error Occured while Fetching Data');
            });
        }
        this.orderFabricId = new forms_1.FormControl();
        this.orderFabricId.valueChanges
            .subscribe(function (term) {
            _this.orderFabric = {
                'fabricName': JSON.parse(term).fabricName,
                'fabricWeight': JSON.parse(term).fabricWeight,
                'fabricType': JSON.parse(term).fabricType,
                'fabricCode': JSON.parse(term).fabricCode
            };
            // console.log('this.orderFabric', this.orderFabric)
            // console.log('this.orderFabric', this.orderFabric)
            _this.myOrderFabricForm.controls['orderFabric'].setValue(_this.orderFabric);
            _this.myOrderFabricForm.controls['orderFabricCode'].setValue(_this.orderFabric.fabricCode);
        });
    };
    OrderFabricComponent.prototype.validateOrderNumber = function (orderNumber) {
        var _this = this;
        this.orderService.checkExistanceOrderNumber(orderNumber)
            .subscribe(function (res) {
            _this.orderDetails = res;
            // console.log('findOrderNumber','this.order',this.orderDetails);
        }, function (err) {
            // console.log('findOrderNumber',err);
        });
    };
    OrderFabricComponent.prototype.addOrderFabric = function (orderFabric) {
        var _this = this;
        this.myOrderFabricForm.disable();
        this.loading = 'postFabric';
        // console.log('addOrderFabric',this.orderDetails, orderFabric);
        if (this.params.action === 'add') {
            this.orderService.postOrderFabric(this.orderDetails, orderFabric)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrderFabricForm.reset();
                _this.myOrderFabricForm.enable();
                // console.log('addOrderFabricResponse', res);
                // console.log('addOrderFabricResponse', res);
                _this.alert.success('Fabric added to ' + _this.params.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.loading = '';
                _this.alert.error('Error Occured while adding fabric to Order ' + _this.params.orderNumber);
                // console.log('addOrderFabricResponse', err);
            });
        }
        else if (this.params.action === 'edit') {
            this.orderService.putOrderFabric(this.edit.id, orderFabric)
                .subscribe(function (res) {
                _this.loading = '';
                _this.myOrderFabricForm.reset();
                _this.myOrderFabricForm.enable();
                // console.log('patchOrderFabricResponse', res);
                // console.log('patchOrderFabricResponse', res);
                _this.alert.success('Fabric updated in ' + _this.params.orderNumber + ' Successfully');
                setTimeout(function () { _this.router.navigate(['/orders']); }, 4000);
            }, function (err) {
                _this.loading = '';
                _this.alert.error('Error Occured while updated fabric in Order ' + _this.params.orderNumber);
                // console.log('patchOrderFabricResponse', err);
            });
        }
    };
    OrderFabricComponent.prototype.getFabricLists = function () {
        var _this = this;
        this.presetsService.getAllFabrics()
            .subscribe(function (res) {
            _this.fabricsList = res;
            // console.log('getFabricsList',res);
        }, function (err) {
            // console.log('getFabricsList',err);
        });
    };
    OrderFabricComponent.prototype.getTreatmentLists = function () {
        var _this = this;
        this.presetsService.getAllTreatments()
            .subscribe(function (res) {
            _this.treatmentsList = res;
            // console.log('getTreatmentsList',res);
        }, function (err) {
            // console.log('getTreatmentsList',err);
        });
    };
    OrderFabricComponent.prototype.buildSpecialTreatmentComponent = function () {
        return new forms_1.FormControl('', [forms_1.Validators.required]);
    };
    OrderFabricComponent.prototype.removeSpecialTreatmentComponent = function (i) {
        this.myOrderFabricForm.get('orderFabricTreatment').removeAt(i);
    };
    OrderFabricComponent.prototype.addSpecialTreatmentComponent = function () {
        this.myOrderFabricForm.get('orderFabricTreatment').push(new forms_1.FormControl(''));
    };
    // non-multiple, return File
    // non-multiple, return File
    OrderFabricComponent.prototype.uploadFile = 
    // non-multiple, return File
    function (file) {
        var _this = this;
        // console.log('File', file);
        // file.name = this.
        if (!(file instanceof File)) {
            this.alertError(file);
            return;
        }
        this.ngxUpload.upload({
            url: this.appConfig.apiEndpoint + '/upload?' + this.params.orderNumber + '&uniqueFilename=uniqueFilename',
            headers: new http_1.HttpHeaders(),
            params: new http_1.HttpParams(),
            fields: {
                toUrl: 'device'
            },
            filesKey: ['MMSUploadFile'],
            files: file
        }).subscribe(function (event) {
            if (event.status === ngxf_uploader_1.UploadStatus.Uploading) {
                _this.uploadStatus.inference = 'Uploading ...';
                _this.uploadStatus.percentage = event.percent;
                // console.log(event.percent);
            }
            else {
                // console.log(event);
            }
        }, function (err) {
            _this.uploadStatus.inference = 'Upload Failed';
            // console.log(err);
        }, function () {
            _this.uploadStatus.inference = 'Successfully Uploaded';
            // console.log('complete');
        });
    };
    // multiple, return FileList
    // multiple, return FileList
    OrderFabricComponent.prototype.uploadFileList = 
    // multiple, return FileList
    function (files) {
        var _this = this;
        // console.log('File', files);
        this.readFiles(files);
        if (!(files instanceof Array)) {
            this.alertError(files);
            return;
        }
        else if (files instanceof Array) {
            files.forEach(function (item, index) {
                _this.orderFabricSamples.push('/' + _this.params.orderNumber + '/' + item.name);
                // console.log(item.name); // 9, 2, 5
                // console.log(index, files.length, this.orderFabricSamples); // 0, 1, 2
            });
        }
        this.ngxUpload.upload({
            url: this.appConfig.apiEndpoint + '/upload?&subdir=' + this.params.orderNumber + '&comments=comments&uniqueFilename=uniqueFilename',
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
            _this.uploadStatus.inference = 'Uploading';
            _this.uploadStatus.percentage = event.percent;
            // console.log(event);
        }, function (err) {
            _this.uploadStatus.inference = 'Upload Failed';
            // console.log(err);
        }, function () {
            _this.uploadStatus.inference = 'Successfully Uploaded';
            _this.myOrderFabricForm.controls['orderFabricSample'].setValue(_this.orderFabricSamples);
            // console.log('complete');
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
                var img = document.createElement('img');
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
            // console.log('img loaded');
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
            var canvas = document.createElement('canvas');
            // Set the canvas to the new calculated dimensions
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
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
        { type: order_service_1.OrderService, },
        { type: presets_service_1.PresetsService, },
        { type: app_config_provider_1.AppConfigProvider, },
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