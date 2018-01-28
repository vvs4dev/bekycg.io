"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("./app.module");
var i2 = require("./app.component");
var i3 = require("./dash/dash.component.ngfactory");
var i4 = require("./base/about/about.component.ngfactory");
var i5 = require("./base/login/login.component.ngfactory");
var i6 = require("./base/register/register.component.ngfactory");
var i7 = require("./orders/orders.component.ngfactory");
var i8 = require("./orders/order-entry/order-entry.component.ngfactory");
var i9 = require("./orders/order-fabric/order-fabric.component.ngfactory");
var i10 = require("./orders/order-job-work/order-job-work.component.ngfactory");
var i11 = require("./orders/order-accessories/order-accessories.component.ngfactory");
var i12 = require("./orders/order-packers/order-packers.component.ngfactory");
var i13 = require("./orders/order-purchase-order/order-purchase-order.component.ngfactory");
var i14 = require("./orders/order-po-grn/order-po-grn.component.ngfactory");
var i15 = require("./stores/stores.component.ngfactory");
var i16 = require("./presets/presets.component.ngfactory");
var i17 = require("./presets/presets-buyers/presets-buyers.component.ngfactory");
var i18 = require("./presets/presets-buyers/presets-buyers-form/presets-buyers-form.component.ngfactory");
var i19 = require("./presets/presets-buyers/presets-buyer-contacts-form/presets-buyer-contacts-form.component.ngfactory");
var i20 = require("./presets/presets-vendors/presets-vendors.component.ngfactory");
var i21 = require("./presets/presets-vendors/presets-vendors-form/presets-vendors-form.component.ngfactory");
var i22 = require("./presets/presets-vendors/presets-vendor-contacts-form/presets-vendor-contacts-form.component.ngfactory");
var i23 = require("./presets/presets-styles/presets-styles.component.ngfactory");
var i24 = require("./presets/presets-fabrics/presets-fabrics.component.ngfactory");
var i25 = require("./presets/presets-treatments/presets-treatments.component.ngfactory");
var i26 = require("./presets/presets-job-works/presets-job-works.component.ngfactory");
var i27 = require("./presets/presets-accessories/presets-accessories.component.ngfactory");
var i28 = require("./presets/presets-packers/presets-packers.component.ngfactory");
var i29 = require("./settings/settings.component.ngfactory");
var i30 = require("./settings/settings-company/settings-company.component.ngfactory");
var i31 = require("./settings/settings-branches/settings-branches.component.ngfactory");
var i32 = require("./settings/settings-department/settings-department.component.ngfactory");
var i33 = require("./app.component.ngfactory");
var i34 = require("@angular/common");
var i35 = require("@angular/platform-browser");
var i36 = require("@angular/animations/browser");
var i37 = require("@angular/platform-browser/animations");
var i38 = require("@angular/animations");
var i39 = require("@angular/router");
var i40 = require("@angular/cdk/bidi");
var i41 = require("@angular/cdk/platform");
var i42 = require("@angular/forms");
var i43 = require("@angular/common/http");
var i44 = require("./_services/user.service");
var i45 = require("@ngx-progressbar/http-client");
var i46 = require("./_services/auth.interceptor");
var i47 = require("@ngx-progressbar/core");
var i48 = require("@angular/material/icon");
var i49 = require("ng2-device-detector");
var i50 = require("ngxf-uploader");
var i51 = require("./_services/alert.service");
var i52 = require("./app-config.provider");
var i53 = require("./_services/auth.service");
var i54 = require("./_guards/auth.guard");
var i55 = require("./presets/presets-buyers/presets-buyer.service");
var i56 = require("./_services/pager.service");
var i57 = require("./presets/presets.service");
var i58 = require("./presets/presets-vendors/presets-vendors.service");
var i59 = require("./presets/presets-styles/presets-styles.service");
var i60 = require("./presets/presets-fabrics/presets-fabrics.service");
var i61 = require("./presets/presets-treatments/presets-treatments.service");
var i62 = require("./presets/presets-job-works/presets-job-works.service");
var i63 = require("./presets/presets-packers/presets-packers.service");
var i64 = require("./dash/dash.service");
var i65 = require("./orders/order-entry/order-entry.service");
var i66 = require("./orders/order-fabric/order-fabrics.service");
var i67 = require("./orders/order.service");
var i68 = require("./orders/order-job-work/order-job-work.service");
var i69 = require("./orders/order-accessories/order-accessories.service");
var i70 = require("./orders/order-packers/order-packers.service");
var i71 = require("./orders/order-purchase-order/order-purchase-order.service");
var i72 = require("./orders/order-po-grn/order-po-grn.service");
var i73 = require("./settings/settings.service");
var i74 = require("./dash/dash.component");
var i75 = require("./base/about/about.component");
var i76 = require("./base/login/login.component");
var i77 = require("./base/register/register.component");
var i78 = require("./orders/orders.component");
var i79 = require("./orders/order-entry/order-entry.component");
var i80 = require("./orders/order-fabric/order-fabric.component");
var i81 = require("./orders/order-job-work/order-job-work.component");
var i82 = require("./orders/order-accessories/order-accessories.component");
var i83 = require("./orders/order-packers/order-packers.component");
var i84 = require("./orders/order-purchase-order/order-purchase-order.component");
var i85 = require("./orders/order-po-grn/order-po-grn.component");
var i86 = require("./stores/stores.component");
var i87 = require("./presets/presets.component");
var i88 = require("./presets/presets-buyers/presets-buyers.component");
var i89 = require("./presets/presets-buyers/presets-buyers-form/presets-buyers-form.component");
var i90 = require("./presets/presets-buyers/presets-buyer-contacts-form/presets-buyer-contacts-form.component");
var i91 = require("./presets/presets-vendors/presets-vendors.component");
var i92 = require("./presets/presets-vendors/presets-vendors-form/presets-vendors-form.component");
var i93 = require("./presets/presets-vendors/presets-vendor-contacts-form/presets-vendor-contacts-form.component");
var i94 = require("./presets/presets-styles/presets-styles.component");
var i95 = require("./presets/presets-fabrics/presets-fabrics.component");
var i96 = require("./presets/presets-treatments/presets-treatments.component");
var i97 = require("./presets/presets-job-works/presets-job-works.component");
var i98 = require("./presets/presets-accessories/presets-accessories.component");
var i99 = require("./presets/presets-packers/presets-packers.component");
var i100 = require("./settings/settings.component");
var i101 = require("./settings/settings-company/settings-company.component");
var i102 = require("./settings/settings-branches/settings-branches.component");
var i103 = require("./settings/settings-department/settings-department.component");
var i104 = require("./app-routing.module");
var i105 = require("@angular/material/core");
var i106 = require("@angular/material/list");
var i107 = require("@angular/material/toolbar");
var i108 = require("ng4-validators");
var i109 = require("@ngx-progressbar/router");
var i110 = require("ngc-float-button/components/ngc-float-button.module");
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i3.DashComponentNgFactory, i4.AboutComponentNgFactory, i5.LoginComponentNgFactory, i6.RegisterComponentNgFactory, i7.OrdersComponentNgFactory, i8.OrderEntryComponentNgFactory, i9.OrderFabricComponentNgFactory, i10.OrderJobWorkComponentNgFactory, i11.OrderAccessoriesComponentNgFactory, i12.OrderPackersComponentNgFactory, i13.OrderPurchaseOrderComponentNgFactory, i14.OrderPoGrnComponentNgFactory, i15.StoresComponentNgFactory, i16.PresetsComponentNgFactory, i17.PresetsBuyersComponentNgFactory, i18.PresetsBuyersFormComponentNgFactory, i19.PresetsBuyerContactsFormComponentNgFactory, i20.PresetsVendorsComponentNgFactory, i21.PresetsVendorsFormComponentNgFactory, i22.PresetsVendorContactsFormComponentNgFactory, i23.PresetsStylesComponentNgFactory, i24.PresetsFabricsComponentNgFactory, i25.PresetsTreatmentsComponentNgFactory, i26.PresetsJobWorksComponentNgFactory, i27.PresetsAccessoriesComponentNgFactory, i28.PresetsPackersComponentNgFactory, i29.SettingsComponentNgFactory, i30.SettingsCompanyComponentNgFactory, i31.SettingsBranchesComponentNgFactory, i32.SettingsDepartmentComponentNgFactory, i33.AppComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵm, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i34.NgLocalization, i34.NgLocaleLocalization, [i0.LOCALE_ID, [2, i34.ɵa]]), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵk, []), i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵl, []), i0.ɵmpd(4608, i35.DomSanitizer, i35.ɵe, [i34.DOCUMENT]), i0.ɵmpd(6144, i0.Sanitizer, null, [i35.DomSanitizer]), i0.ɵmpd(4608, i35.HAMMER_GESTURE_CONFIG, i35.HammerGestureConfig, []), i0.ɵmpd(5120, i35.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new i35.ɵDomEventsPlugin(p0_0, p0_1), new i35.ɵKeyEventsPlugin(p1_0), new i35.ɵHammerGesturesPlugin(p2_0, p2_1)]; }, [i34.DOCUMENT, i0.NgZone, i34.DOCUMENT, i34.DOCUMENT, i35.HAMMER_GESTURE_CONFIG]), i0.ɵmpd(4608, i35.EventManager, i35.EventManager, [i35.EVENT_MANAGER_PLUGINS, i0.NgZone]), i0.ɵmpd(135680, i35.ɵDomSharedStylesHost, i35.ɵDomSharedStylesHost, [i34.DOCUMENT]), i0.ɵmpd(4608, i35.ɵDomRendererFactory2, i35.ɵDomRendererFactory2, [i35.EventManager, i35.ɵDomSharedStylesHost]), i0.ɵmpd(5120, i36.AnimationDriver, i37.ɵc, []), i0.ɵmpd(5120, i36.ɵAnimationStyleNormalizer, i37.ɵd, []), i0.ɵmpd(4608, i36.ɵAnimationEngine, i37.ɵb, [i36.AnimationDriver, i36.ɵAnimationStyleNormalizer]), i0.ɵmpd(5120, i0.RendererFactory2, i37.ɵe, [i35.ɵDomRendererFactory2, i36.ɵAnimationEngine, i0.NgZone]), i0.ɵmpd(6144, i35.ɵSharedStylesHost, null, [i35.ɵDomSharedStylesHost]), i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]), i0.ɵmpd(4608, i35.Meta, i35.Meta, [i34.DOCUMENT]), i0.ɵmpd(4608, i35.Title, i35.Title, [i34.DOCUMENT]), i0.ɵmpd(4608, i38.AnimationBuilder, i37.ɵBrowserAnimationBuilder, [i0.RendererFactory2, i35.DOCUMENT]), i0.ɵmpd(5120, i39.ActivatedRoute, i39.ɵf, [i39.Router]), i0.ɵmpd(4608, i39.NoPreloading, i39.NoPreloading, []), i0.ɵmpd(6144, i39.PreloadingStrategy, null, [i39.NoPreloading]), i0.ɵmpd(135680, i39.RouterPreloader, i39.RouterPreloader, [i39.Router, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector, i39.PreloadingStrategy]), i0.ɵmpd(4608, i39.PreloadAllModules, i39.PreloadAllModules, []), i0.ɵmpd(5120, i39.ROUTER_INITIALIZER, i39.ɵi, [i39.ɵg]), i0.ɵmpd(5120, i0.APP_BOOTSTRAP_LISTENER, function (p0_0) { return [p0_0]; }, [i39.ROUTER_INITIALIZER]), i0.ɵmpd(6144, i40.DIR_DOCUMENT, null, [i34.DOCUMENT]), i0.ɵmpd(4608, i40.Directionality, i40.Directionality, [[2, i40.DIR_DOCUMENT]]), i0.ɵmpd(4608, i41.Platform, i41.Platform, []), i0.ɵmpd(4608, i42.ɵi, i42.ɵi, []), i0.ɵmpd(4608, i42.FormBuilder, i42.FormBuilder, []), i0.ɵmpd(4608, i43.HttpXsrfTokenExtractor, i43.ɵg, [i34.DOCUMENT, i0.PLATFORM_ID, i43.ɵe]), i0.ɵmpd(4608, i43.ɵh, i43.ɵh, [i43.HttpXsrfTokenExtractor, i43.ɵf]), i0.ɵmpd(4608, i44.UserService, i44.UserService, []), i0.ɵmpd(5120, i43.HTTP_INTERCEPTORS, function (p0_0, p1_0, p2_0) { return [p0_0, new i45.ɵa(p1_0), new i46.AuthInterceptor(p2_0)]; }, [i43.ɵh, i47.NgProgress, i44.UserService]), i0.ɵmpd(4608, i43.ɵd, i43.ɵd, []), i0.ɵmpd(6144, i43.XhrFactory, null, [i43.ɵd]), i0.ɵmpd(4608, i43.HttpXhrBackend, i43.HttpXhrBackend, [i43.XhrFactory]), i0.ɵmpd(6144, i43.HttpBackend, null, [i43.HttpXhrBackend]), i0.ɵmpd(5120, i43.HttpHandler, i43.ɵinterceptingHandler, [i43.HttpBackend, [2, i43.HTTP_INTERCEPTORS]]), i0.ɵmpd(4608, i43.HttpClient, i43.HttpClient, [i43.HttpHandler]), i0.ɵmpd(4608, i48.MatIconRegistry, i48.MatIconRegistry, [[2, i43.HttpClient], i35.DomSanitizer]), i0.ɵmpd(4608, i49.ReTree, i49.ReTree, []), i0.ɵmpd(4608, i49.Ng2DeviceService, i49.Ng2DeviceService, []), i0.ɵmpd(4608, i50.NgxfUploaderService, i50.NgxfUploaderService, [i43.HttpClient]), i0.ɵmpd(4608, i51.AlertService, i51.AlertService, [i39.Router]), i0.ɵmpd(4608, i52.AppConfigProvider, i52.AppConfigProvider, []), i0.ɵmpd(4608, i53.AuthService, i53.AuthService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i54.AuthGuard, i54.AuthGuard, [i44.UserService, i39.Router]), i0.ɵmpd(4608, i55.PresetsBuyerService, i55.PresetsBuyerService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i56.PagerService, i56.PagerService, []), i0.ɵmpd(4608, i57.PresetsService, i57.PresetsService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i58.PresetsVendorsService, i58.PresetsVendorsService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i59.PresetsStylesService, i59.PresetsStylesService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i60.PresetsFabricsService, i60.PresetsFabricsService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i61.PresetsTreatmentsService, i61.PresetsTreatmentsService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i62.PresetsJobWorksService, i62.PresetsJobWorksService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i63.PresetsPackersService, i63.PresetsPackersService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i64.DashService, i64.DashService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i65.OrderEntryService, i65.OrderEntryService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i66.OrderFabricsService, i66.OrderFabricsService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i67.OrderService, i67.OrderService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i68.OrderJobWorkService, i68.OrderJobWorkService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i69.OrderAccessoriesService, i69.OrderAccessoriesService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i70.OrderPackersService, i70.OrderPackersService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i71.OrderPurchaseOrderService, i71.OrderPurchaseOrderService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i72.OrderPoGrnService, i72.OrderPoGrnService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(4608, i73.SettingsService, i73.SettingsService, [i44.UserService, i43.HttpClient, i39.Router, i39.ActivatedRoute, i51.AlertService, i52.AppConfigProvider]), i0.ɵmpd(512, i34.CommonModule, i34.CommonModule, []), i0.ɵmpd(1024, i0.ErrorHandler, i35.ɵa, []), i0.ɵmpd(1024, i0.NgProbeToken, function () { return [i39.ɵb()]; }, []), i0.ɵmpd(512, i39.ɵg, i39.ɵg, [i0.Injector]), i0.ɵmpd(256, i0.APP_ID, "bekycg", []), i0.ɵmpd(2048, i35.ɵTRANSITION_ID, null, [i0.APP_ID]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0, p1_0, p2_0, p2_1, p2_2) { return [i35.ɵh(p0_0), i39.ɵh(p1_0), i35.ɵf(p2_0, p2_1, p2_2)]; }, [[2, i0.NgProbeToken], i39.ɵg, i35.ɵTRANSITION_ID, i34.DOCUMENT, i0.Injector]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef, [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]), i0.ɵmpd(512, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(512, i35.BrowserModule, i35.BrowserModule, [[3, i35.BrowserModule]]), i0.ɵmpd(512, i37.BrowserAnimationsModule, i37.BrowserAnimationsModule, []), i0.ɵmpd(512, i49.Ng2DeviceDetectorModule, i49.Ng2DeviceDetectorModule, []), i0.ɵmpd(512, i50.NgxfUploaderModule, i50.NgxfUploaderModule, []), i0.ɵmpd(1024, i39.ɵa, i39.ɵd, [[3, i39.Router]]), i0.ɵmpd(512, i39.UrlSerializer, i39.DefaultUrlSerializer, []), i0.ɵmpd(512, i39.ChildrenOutletContexts, i39.ChildrenOutletContexts, []), i0.ɵmpd(256, i39.ROUTER_CONFIGURATION, { useHash: true }, []), i0.ɵmpd(1024, i34.LocationStrategy, i39.ɵc, [i34.PlatformLocation, [2, i34.APP_BASE_HREF], i39.ROUTER_CONFIGURATION]), i0.ɵmpd(512, i34.Location, i34.Location, [i34.LocationStrategy]), i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i0.NgModuleFactoryLoader, i0.SystemJsNgModuleLoader, [i0.Compiler, [2, i0.SystemJsNgModuleLoaderConfig]]), i0.ɵmpd(1024, i39.ROUTES, function () { return [[{ path: "", canActivate: [i54.AuthGuard], component: i74.DashComponent }, { path: "about", canActivate: [i54.AuthGuard], component: i75.AboutComponent }, { path: "login", component: i76.LoginComponent }, { path: "register", component: i77.RegisterComponent }, { path: "orders", canActivate: [i54.AuthGuard], component: i78.OrdersComponent }, { path: "order/entry/:action/:orderNumber", canActivate: [i54.AuthGuard], component: i79.OrderEntryComponent }, { path: "order/:orderNumber/fabrics/:action/:id", canActivate: [i54.AuthGuard], component: i80.OrderFabricComponent }, { path: "order/:orderNumber/jobworks/:action/:id", canActivate: [i54.AuthGuard], component: i81.OrderJobWorkComponent }, { path: "order/:orderNumber/accessories/:action/:id", canActivate: [i54.AuthGuard], component: i82.OrderAccessoriesComponent }, { path: "order/:orderNumber/packers/:action/:id", canActivate: [i54.AuthGuard], component: i83.OrderPackersComponent }, { path: "order/:orderNumber/po/:action/:id", canActivate: [i54.AuthGuard], component: i84.OrderPurchaseOrderComponent }, { path: "order/:orderNumber/grn/:action/:id", canActivate: [i54.AuthGuard], component: i85.OrderPoGrnComponent }, { path: "stores", canActivate: [i54.AuthGuard], component: i86.StoresComponent }, { path: "presets", canActivate: [i54.AuthGuard], component: i87.PresetsComponent }, { path: "presets/buyers", canActivate: [i54.AuthGuard], component: i88.PresetsBuyersComponent }, { path: "presets/buyers/form", canActivate: [i54.AuthGuard], component: i89.PresetsBuyersFormComponent }, { path: "presets/buyer/:code/contacts/form", canActivate: [i54.AuthGuard], component: i90.PresetsBuyerContactsFormComponent }, { path: "presets/vendors", canActivate: [i54.AuthGuard], component: i91.PresetsVendorsComponent }, { path: "presets/vendors/form", canActivate: [i54.AuthGuard], component: i92.PresetsVendorsFormComponent }, { path: "presets/vendor/:code/contacts/form", canActivate: [i54.AuthGuard], component: i93.PresetsVendorContactsFormComponent }, { path: "presets/styles", canActivate: [i54.AuthGuard], component: i94.PresetsStylesComponent }, { path: "presets/fabrics", canActivate: [i54.AuthGuard], component: i95.PresetsFabricsComponent }, { path: "presets/treatments", canActivate: [i54.AuthGuard], component: i96.PresetsTreatmentsComponent }, { path: "presets/jobworks", canActivate: [i54.AuthGuard], component: i97.PresetsJobWorksComponent }, { path: "presets/accessories", canActivate: [i54.AuthGuard], component: i98.PresetsAccessoriesComponent }, { path: "presets/packers", canActivate: [i54.AuthGuard], component: i99.PresetsPackersComponent }, { path: "settings", canActivate: [i54.AuthGuard], component: i100.SettingsComponent }, { path: "settings/company/:action/:id", canActivate: [i54.AuthGuard], component: i101.SettingsCompanyComponent }, { path: "settings/:company/branch/:action/:id", canActivate: [i54.AuthGuard], component: i102.SettingsBranchesComponent }, { path: "settings/:company/:branch/department/:action/:id", canActivate: [i54.AuthGuard], component: i103.SettingsDepartmentComponent }]]; }, []), i0.ɵmpd(1024, i39.Router, i39.ɵe, [i0.ApplicationRef, i39.UrlSerializer, i39.ChildrenOutletContexts, i34.Location, i0.Injector, i0.NgModuleFactoryLoader, i0.Compiler, i39.ROUTES, i39.ROUTER_CONFIGURATION, [2, i39.UrlHandlingStrategy], [2, i39.RouteReuseStrategy]]), i0.ɵmpd(512, i39.RouterModule, i39.RouterModule, [[2, i39.ɵa], [2, i39.Router]]), i0.ɵmpd(512, i104.AppRoutingModule, i104.AppRoutingModule, []), i0.ɵmpd(512, i40.BidiModule, i40.BidiModule, []), i0.ɵmpd(256, i105.MATERIAL_SANITY_CHECKS, true, []), i0.ɵmpd(512, i105.MatCommonModule, i105.MatCommonModule, [[2, i105.MATERIAL_SANITY_CHECKS]]), i0.ɵmpd(512, i105.MatLineModule, i105.MatLineModule, []), i0.ɵmpd(512, i41.PlatformModule, i41.PlatformModule, []), i0.ɵmpd(512, i105.MatRippleModule, i105.MatRippleModule, []), i0.ɵmpd(512, i105.MatPseudoCheckboxModule, i105.MatPseudoCheckboxModule, []), i0.ɵmpd(512, i106.MatListModule, i106.MatListModule, []), i0.ɵmpd(512, i107.MatToolbarModule, i107.MatToolbarModule, []), i0.ɵmpd(512, i42.ɵba, i42.ɵba, []), i0.ɵmpd(512, i42.FormsModule, i42.FormsModule, []), i0.ɵmpd(512, i42.ReactiveFormsModule, i42.ReactiveFormsModule, []), i0.ɵmpd(512, i108.CustomFormsModule, i108.CustomFormsModule, []), i0.ɵmpd(512, i43.HttpClientXsrfModule, i43.HttpClientXsrfModule, []), i0.ɵmpd(512, i43.HttpClientModule, i43.HttpClientModule, []), i0.ɵmpd(512, i47.NgProgressModule, i47.NgProgressModule, []), i0.ɵmpd(512, i45.NgProgressHttpClientModule, i45.NgProgressHttpClientModule, []), i0.ɵmpd(512, i47.NgProgress, i47.NgProgress, []), i0.ɵmpd(512, i109.NgProgressRouterModule, i109.NgProgressRouterModule, [i39.Router, i47.NgProgress]), i0.ɵmpd(512, i48.MatIconModule, i48.MatIconModule, []), i0.ɵmpd(512, i110.NgcFloatButtonModule, i110.NgcFloatButtonModule, []), i0.ɵmpd(512, i1.AppModule, i1.AppModule, []), i0.ɵmpd(256, i43.ɵe, "XSRF-TOKEN", []), i0.ɵmpd(256, i43.ɵf, "X-XSRF-TOKEN", [])]); });
exports.AppModuleNgFactory = AppModuleNgFactory;
//# sourceMappingURL=app.module.ngfactory.js.map