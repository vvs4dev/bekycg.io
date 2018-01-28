"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var ng2_device_detector_1 = require("ng2-device-detector");
// import { isReachable } from './../../node_modules/i'
var AppComponent = /** @class */ (function () {
    function AppComponent(deviceService) {
        this.title = 'app';
        this.deviceInfo = deviceService.getDeviceInfo();
        this.checkBrowserCompatibility();
        this.validateDashElements();
        this.monitorOnlineStatus();
    }
    AppComponent.prototype.checkBrowserCompatibility = function () {
        console.log('hello `Home` component');
        // this.deviceInfo = deviceService.getDeviceInfo();
        console.log(this.deviceInfo);
    };
    AppComponent.prototype.monitorOnlineStatus = function () {
        this.online$ = Rx_1.Observable.merge(Rx_1.Observable.of(navigator.onLine), Rx_1.Observable.fromEvent(window, 'online').mapTo(true), Rx_1.Observable.fromEvent(window, 'offline').mapTo(false));
    };
    AppComponent.prototype.validateDashElements = function () {
        if (localStorage.getItem('userConfig')) {
            console.log('localStorage.getItem(userConfig) - exists');
            this.enableDashElements();
        }
        else {
            console.log('localStorage.getItem(userConfig) - not exists');
            this.disableDashElements();
        }
    };
    AppComponent.prototype.enableDashElements = function () {
        this.mySidebarStyle = 'uk-visible@m uk-width-1-4@m uk-width-1-5@l uk-light uk-background-primary';
        this.myContentStyle = 'uk-width-3-4@m uk-width-4-5@l';
        this.activeBreadCrumbVisibility = 'uk-visible';
    };
    AppComponent.prototype.disableDashElements = function () {
        this.mySidebarStyle = 'uk-hidden';
        this.myContentStyle = 'uk-width-1-1';
        this.activeBreadCrumbVisibility = 'uk-hidden';
    };
    AppComponent.prototype.setActiveBreadcrumb = function (active, bc) {
        console.log('active, bc', active, bc);
        this.breadCrumb = bc;
        this.activeMenu = active;
    };
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-root',
                    templateUrl: './app.component.html',
                    styleUrls: ['./app.component.scss']
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return [
        { type: ng2_device_detector_1.Ng2DeviceService, },
    ]; };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map