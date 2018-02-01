"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConfigProvider = /** @class */ (function () {
    function AppConfigProvider() {
        // apiEndpoint :string = 'https://bekycg-dpd.herokuapp.com';
        this.apiEndpoint = 'http://localhost:5000';
        this.docsBase = '/_docs';
        this.sideMenu = [
            {
                "icon": 'dashboard',
                "type": 'parent',
                "parentMenu": "Dashboard",
                "class": "uk-accordion-title",
                "routerLink": '/',
                "subMenu": []
            },
            {
                "icon": 'work',
                "type": 'parent',
                "parentMenu": "Orders",
                "class": "uk-accordion-title",
                "routerLink": "orders",
                "subMenu": []
            },
            {
                "icon": 'pie_chart',
                "type": 'parent',
                "parentMenu": "Reports",
                "class": "uk-accordion-title",
                "subMenu": [
                    {
                        "menu": "Orders",
                        "routerLink": 'reports/orders'
                    },
                    {
                        "menu": "Fabric",
                        "routerLink": 'reports/fabric'
                    },
                    {
                        "menu": "Accessories",
                        "routerLink": 'reports/accessories'
                    },
                    {
                        "menu": "Cutting",
                        "routerLink": 'reports/cutting'
                    },
                    {
                        "menu": "Stitching",
                        "routerLink": 'reports/stitching'
                    },
                    {
                        "menu": "Finishing Goods",
                        "routerLink": 'reports/finishing'
                    },
                    {
                        "menu": "Warehouse",
                        "routerLink": 'reports/warehouse'
                    },
                    {
                        "menu": "Master",
                        "routerLink": 'reports/master'
                    }
                ]
            },
            {
                "icon": 'store',
                "type": 'parent',
                "parentMenu": "Stores",
                "class": "uk-accordion-title",
                "routerLink": 'stores',
                "subMenu": [
                    {
                        "menu": "Fabric Material",
                        "routerLink": 'stores/fabric'
                    },
                    {
                        "menu": "Accessories",
                        "routerLink": 'stores/accessories'
                    },
                    {
                        "menu": "Warehouse",
                        "routerLink": 'stores/warehouse'
                    }
                ]
            },
            {
                "icon": 'web',
                "type": 'parent',
                "parentMenu": "My Presets",
                "class": "uk-accordion-title",
                "routerLink": "presets",
                "subMenu": [
                    {
                        "menu": "Buyers",
                        "routerLink": 'presets/buyers'
                    },
                    {
                        "menu": "Vendors",
                        "routerLink": 'presets/vendors'
                    },
                    {
                        "menu": "Styles",
                        "routerLink": 'presets/styles'
                    },
                    {
                        "menu": "Fabrics",
                        "routerLink": 'presets/fabrics'
                    },
                    {
                        "menu": "Special Treatments",
                        "routerLink": 'presets/treatments'
                    },
                    {
                        "menu": "Jobs",
                        "routerLink": 'presets/jobs'
                    },
                    {
                        "menu": "Accessories",
                        "routerLink": 'presets/accessories'
                    },
                    {
                        "menu": "Packing Materials",
                        "routerLink": 'presets/packers'
                    }
                ]
            },
            {
                "icon": 'settings',
                "type": 'parent',
                "parentMenu": "Settings",
                "routerLink": "settings",
                "class": "uk-accordion-title",
                "subMenu": []
            },
            {
                "icon": 'power_settings_new',
                "type": 'parent',
                "parentMenu": "Logout",
                "class": "uk-accordion-title",
                "routerLink": 'login',
                "subMenu": []
            }
        ];
    }
    AppConfigProvider.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AppConfigProvider.ctorParameters = function () { return []; };
    return AppConfigProvider;
}());
exports.AppConfigProvider = AppConfigProvider;
//# sourceMappingURL=app-config.provider.js.map