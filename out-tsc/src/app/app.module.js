"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_device_detector_1 = require("ng2-device-detector");
var forms_1 = require("@angular/forms");
var ng4_validators_1 = require("ng4-validators");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/common/http");
var auth_interceptor_1 = require("./_services/auth.interceptor");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/filter");
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
var ngxf_uploader_1 = require("ngxf-uploader");
var core_2 = require("@ngx-progressbar/core");
var http_client_1 = require("@ngx-progressbar/http-client");
var router_1 = require("@ngx-progressbar/router");
var ngc_float_button_1 = require("ngc-float-button");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./base/home/home.component");
var about_component_1 = require("./base/about/about.component");
var material_1 = require("@angular/material");
var login_component_1 = require("./base/login/login.component");
var register_component_1 = require("./base/register/register.component");
// Base Components
var header_component_1 = require("./partials/header/header.component");
var footer_component_1 = require("./partials/footer/footer.component");
var sidebar_component_1 = require("./partials/sidebar/sidebar.component");
// Dash Component
var dash_component_1 = require("./dash/dash.component");
// Presets Component Start
var presets_component_1 = require("./presets/presets.component");
var presets_buyers_component_1 = require("./presets/presets-buyers/presets-buyers.component");
var presets_buyers_form_component_1 = require("./presets/presets-buyers/presets-buyers-form/presets-buyers-form.component");
var presets_buyer_contacts_form_component_1 = require("./presets/presets-buyers/presets-buyer-contacts-form/presets-buyer-contacts-form.component");
var presets_styles_component_1 = require("./presets/presets-styles/presets-styles.component");
var presets_vendors_component_1 = require("./presets/presets-vendors/presets-vendors.component");
var presets_vendors_form_component_1 = require("./presets/presets-vendors/presets-vendors-form/presets-vendors-form.component");
var presets_vendor_contacts_form_component_1 = require("./presets/presets-vendors/presets-vendor-contacts-form/presets-vendor-contacts-form.component");
var presets_fabrics_component_1 = require("./presets/presets-fabrics/presets-fabrics.component");
var presets_treatments_component_1 = require("./presets/presets-treatments/presets-treatments.component");
var presets_jobs_component_1 = require("./presets/presets-jobs/presets-jobs.component");
var presets_accessories_component_1 = require("./presets/presets-accessories/presets-accessories.component");
var presets_packers_component_1 = require("./presets/presets-packers/presets-packers.component");
var presets_service_1 = require("./presets/presets.service");
// Presets Component End
// Orders Components Start
var orders_component_1 = require("./orders/orders.component");
var order_entry_component_1 = require("./orders/order-entry/order-entry.component");
var order_fabric_component_1 = require("./orders/order-fabric/order-fabric.component");
var order_job_component_1 = require("./orders/order-job/order-job.component");
var order_accessories_component_1 = require("./orders/order-accessories/order-accessories.component");
var order_packers_component_1 = require("./orders/order-packers/order-packers.component");
var order_po_component_1 = require("./orders/order-po/order-po.component");
var order_po_grn_component_1 = require("./orders/order-po-grn/order-po-grn.component");
var order_service_1 = require("./orders/order.service");
// Orders Components End
// Stores Components Start
var stores_component_1 = require("./stores/stores.component");
// Stores Components End
// Settings Component Start
var settings_component_1 = require("./settings/settings.component");
var settings_company_component_1 = require("./settings/settings-company/settings-company.component");
var settings_branches_component_1 = require("./settings/settings-branches/settings-branches.component");
var settings_department_component_1 = require("./settings/settings-department/settings-department.component");
var settings_service_1 = require("./settings/settings.service");
// Settings Component End
var user_service_1 = require("./_services/user.service");
var auth_guard_1 = require("./_guards/auth.guard");
var auth_service_1 = require("./_services/auth.service");
var alert_component_1 = require("./_directives/alert/alert.component");
var alert_service_1 = require("./_services/alert.service");
var app_config_provider_1 = require("./app-config.provider");
var validation_errors_component_1 = require("./_directives/validators/validation-errors.component");
var pager_service_1 = require("./_services/pager.service");
var dash_service_1 = require("./dash/dash.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        app_component_1.AppComponent,
                        home_component_1.HomeComponent,
                        about_component_1.AboutComponent,
                        header_component_1.HeaderComponent,
                        footer_component_1.FooterComponent,
                        login_component_1.LoginComponent,
                        dash_component_1.DashComponent,
                        alert_component_1.AlertComponent,
                        register_component_1.RegisterComponent,
                        sidebar_component_1.SidebarComponent,
                        presets_component_1.PresetsComponent,
                        presets_buyers_component_1.PresetsBuyersComponent,
                        presets_buyers_form_component_1.PresetsBuyersFormComponent,
                        presets_buyer_contacts_form_component_1.PresetsBuyerContactsFormComponent,
                        presets_styles_component_1.PresetsStylesComponent,
                        presets_vendors_component_1.PresetsVendorsComponent,
                        presets_vendors_form_component_1.PresetsVendorsFormComponent,
                        presets_vendor_contacts_form_component_1.PresetsVendorContactsFormComponent,
                        presets_fabrics_component_1.PresetsFabricsComponent,
                        presets_treatments_component_1.PresetsTreatmentsComponent,
                        presets_jobs_component_1.PresetsJobsComponent,
                        presets_accessories_component_1.PresetsAccessoriesComponent,
                        presets_packers_component_1.PresetsPackersComponent,
                        orders_component_1.OrdersComponent,
                        order_entry_component_1.OrderEntryComponent,
                        order_fabric_component_1.OrderFabricComponent,
                        order_job_component_1.OrderJobComponent,
                        order_accessories_component_1.OrderAccessoriesComponent,
                        order_packers_component_1.OrderPackersComponent,
                        order_po_component_1.OrderPOComponent,
                        order_po_grn_component_1.OrderPoGrnComponent,
                        stores_component_1.StoresComponent,
                        validation_errors_component_1.ValidationErrorsComponent,
                        settings_component_1.SettingsComponent,
                        settings_company_component_1.SettingsCompanyComponent,
                        settings_branches_component_1.SettingsBranchesComponent,
                        settings_department_component_1.SettingsDepartmentComponent
                    ],
                    imports: [
                        platform_browser_1.BrowserModule.withServerTransition({ appId: 'bekycg' }),
                        animations_1.BrowserAnimationsModule,
                        ng2_device_detector_1.Ng2DeviceDetectorModule.forRoot(),
                        ngxf_uploader_1.NgxfUploaderModule.forRoot(),
                        app_routing_module_1.AppRoutingModule,
                        material_1.MatListModule, material_1.MatToolbarModule,
                        forms_1.FormsModule, forms_1.ReactiveFormsModule,
                        ng4_validators_1.CustomFormsModule,
                        http_1.HttpClientModule,
                        core_2.NgProgressModule.forRoot(),
                        http_client_1.NgProgressHttpClientModule,
                        router_1.NgProgressRouterModule,
                        ngc_float_button_1.NgcFloatButtonModule
                    ],
                    providers: [
                        user_service_1.UserService,
                        auth_service_1.AuthService,
                        { provide: http_2.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true },
                        auth_guard_1.AuthGuard,
                        alert_service_1.AlertService,
                        app_config_provider_1.AppConfigProvider,
                        material_1.MatIconRegistry,
                        pager_service_1.PagerService,
                        dash_service_1.DashService,
                        presets_service_1.PresetsService,
                        order_service_1.OrderService,
                        settings_service_1.SettingsService
                    ],
                    bootstrap: [app_component_1.AppComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return []; };
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map