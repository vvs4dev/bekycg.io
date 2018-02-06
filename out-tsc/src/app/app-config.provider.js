"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConfigProvider = /** @class */ (function () {
    function AppConfigProvider() {
        this.apiEndpoint = 'https://bekycg-dpd.herokuapp.com';
        // apiEndpoint: string = 'http://localhost:5000';
        this.docsBase = '/_docs';
        this.dropMenu = {
            dash: [
                {
                    "icon": 'icon-speedometer',
                    "type": 'parent',
                    "parent": "Dashboard",
                    "routerLink": '/',
                }
            ],
            profile: [
                {
                    "icon": 'icon-user',
                    "type": 'parent',
                    "parent": "Profile",
                    "routerLink": '/',
                },
                {
                    "icon": 'icon-settings',
                    "type": 'parent',
                    "parent": "Settings",
                    "routerLink": '/settings',
                },
                {
                    "icon": 'icon-logout',
                    "type": 'parent',
                    "parent": "Logout",
                    "routerLink": '/login',
                }
            ],
            operations: [
                {
                    "icon": 'icon-handbag',
                    "type": 'parent',
                    "parent": "Orders",
                    "routerLink": '/orders',
                },
                {
                    "icon": 'icon-loop',
                    "type": 'parent',
                    "parent": "Process",
                    "routerLink": '/Process',
                },
                {
                    "icon": 'icon-basket-loaded',
                    "type": 'parent',
                    "parent": "Inventory",
                    "routerLink": '/',
                }
            ],
            presets: [
                {
                    "icon": 'icon-people',
                    "type": 'parent',
                    "parent": "Contacts",
                    "routerLink": '/presets',
                    "hasSubMenu": true,
                    "subMenu": [
                        {
                            "type": 'sub',
                            "sub": "Buyers",
                            "routerLink": '/presets/buyers',
                        },
                        {
                            "type": 'sub',
                            "sub": "Vendors",
                            "routerLink": '/presets/vendors',
                        }
                    ]
                },
                {
                    "icon": 'icon-notebook',
                    "type": 'parent',
                    "parent": "Process",
                    "routerLink": '/presets',
                    "hasSubMenu": true,
                    "subMenu": [
                        {
                            "type": 'sub',
                            "sub": "Styles",
                            "routerLink": '/presets/styles',
                        },
                        {
                            "type": 'sub',
                            "sub": "Jobs",
                            "routerLink": '/presets/jobs',
                        },
                        {
                            "type": 'sub',
                            "sub": "Treatments",
                            "routerLink": '/presets/treatment',
                        }
                    ]
                },
                {
                    "icon": 'icon-layers',
                    "type": 'parent',
                    "parent": "Materials",
                    "routerLink": 'presets',
                    "hasSubMenu": true,
                    "subMenu": [
                        {
                            "type": 'sub',
                            "sub": "Fabric",
                            "routerLink": '/presets/fabrics',
                        },
                        {
                            "type": 'sub',
                            "sub": "Accessories",
                            "routerLink": '/presets/accessories',
                        },
                        {
                            "type": 'sub',
                            "sub": "Packers",
                            "routerLink": '/presets/packers',
                        }
                    ]
                }
            ]
        };
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
                        "routerLink": '/reports/orders'
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