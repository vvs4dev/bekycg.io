"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Non Auth Components Start
var about_component_1 = require("./base/about/about.component");
var login_component_1 = require("./base/login/login.component");
var register_component_1 = require("./base/register/register.component");
// Non Auth Components End
//  Auth Components Start
var dash_component_1 = require("./dash/dash.component");
// Orders Start
var orders_component_1 = require("./orders/orders.component");
var order_entry_component_1 = require("./orders/order-entry/order-entry.component");
var order_fabric_component_1 = require("./orders/order-fabric/order-fabric.component");
var order_job_component_1 = require("./orders/order-job/order-job.component");
var order_accessories_component_1 = require("./orders/order-accessories/order-accessories.component");
var order_packers_component_1 = require("./orders/order-packers/order-packers.component");
var order_po_component_1 = require("./orders/order-po/order-po.component");
var order_po_grn_component_1 = require("./orders/order-po-grn/order-po-grn.component");
// Orders End
// Stores Start
var stores_component_1 = require("./stores/stores.component");
// Settings Component Start
var settings_component_1 = require("./settings/settings.component");
var settings_company_component_1 = require("./settings/settings-company/settings-company.component");
var settings_branches_component_1 = require("./settings/settings-branches/settings-branches.component");
var settings_department_component_1 = require("./settings/settings-department/settings-department.component");
// Settings Component End
// Presets Start
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
var auth_guard_1 = require("./_guards/auth.guard");
var routes = [
    {
        path: '',
        canActivate: [auth_guard_1.AuthGuard],
        component: dash_component_1.DashComponent
    },
    {
        path: 'about',
        canActivate: [auth_guard_1.AuthGuard],
        component: about_component_1.AboutComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'orders',
        canActivate: [auth_guard_1.AuthGuard],
        component: orders_component_1.OrdersComponent
    },
    {
        path: 'order/entry/:action/:orderNumber',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_entry_component_1.OrderEntryComponent
    },
    {
        path: 'order/:orderNumber/fabrics/:action/:id',
        // path: 'orders.fabrics',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_fabric_component_1.OrderFabricComponent
    },
    {
        path: 'order/:orderNumber/jobs/:action/:id',
        // path: 'orders.jobs',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_job_component_1.OrderJobComponent
    },
    {
        path: 'order/:orderNumber/accessories/:action/:id',
        // path: 'orders.accessories',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_accessories_component_1.OrderAccessoriesComponent
    },
    {
        path: 'order/:orderNumber/packers/:action/:id',
        // path: 'orders.packers',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_packers_component_1.OrderPackersComponent
    },
    {
        path: 'order/:orderNumber/po/:action/:id',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_po_component_1.OrderPOComponent
    },
    {
        path: 'order/:orderNumber/grn/:action/:id',
        canActivate: [auth_guard_1.AuthGuard],
        component: order_po_grn_component_1.OrderPoGrnComponent
    },
    {
        path: 'stores',
        canActivate: [auth_guard_1.AuthGuard],
        component: stores_component_1.StoresComponent
    },
    {
        path: 'presets',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_component_1.PresetsComponent
    },
    {
        path: 'presets/buyers',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_buyers_component_1.PresetsBuyersComponent
    },
    {
        path: 'presets/buyers/form',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_buyers_form_component_1.PresetsBuyersFormComponent
    },
    {
        path: 'presets/buyer/:code/contacts/form',
        // path: 'presets.buyer.contacts.form',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_buyer_contacts_form_component_1.PresetsBuyerContactsFormComponent
    },
    {
        path: 'presets/vendors',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_vendors_component_1.PresetsVendorsComponent
    },
    {
        path: 'presets/vendors/form',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_vendors_form_component_1.PresetsVendorsFormComponent
    },
    {
        path: 'presets/vendor/:code/contacts/form',
        // path: 'presets.vendor.contacts.form',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_vendor_contacts_form_component_1.PresetsVendorContactsFormComponent
    },
    {
        path: 'presets/styles',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_styles_component_1.PresetsStylesComponent
    },
    {
        path: 'presets/fabrics',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_fabrics_component_1.PresetsFabricsComponent
    },
    {
        path: 'presets/treatments',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_treatments_component_1.PresetsTreatmentsComponent
    },
    {
        path: 'presets/jobs',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_jobs_component_1.PresetsJobsComponent
    },
    {
        path: 'presets/accessories',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_accessories_component_1.PresetsAccessoriesComponent
    },
    {
        path: 'presets/packers',
        canActivate: [auth_guard_1.AuthGuard],
        component: presets_packers_component_1.PresetsPackersComponent
    },
    {
        path: 'settings',
        canActivate: [auth_guard_1.AuthGuard],
        component: settings_component_1.SettingsComponent
    },
    {
        path: 'settings/company/:action/:id',
        canActivate: [auth_guard_1.AuthGuard],
        component: settings_company_component_1.SettingsCompanyComponent
    },
    {
        path: 'settings/:company/branch/:action/:id',
        canActivate: [auth_guard_1.AuthGuard],
        component: settings_branches_component_1.SettingsBranchesComponent
    },
    {
        path: 'settings/:company/:branch/department/:action/:id',
        canActivate: [auth_guard_1.AuthGuard],
        component: settings_department_component_1.SettingsDepartmentComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
                    exports: [router_1.RouterModule]
                },] },
    ];
    /** @nocollapse */
    AppRoutingModule.ctorParameters = function () { return []; };
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map