"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConfigProvider = /** @class */ (function () {
    function AppConfigProvider() {
        // apiEndpoint :string = 'https://bekycg-dpd.herokuapp.com';
        this.apiEndpoint = 'http://localhost:5000';
        this.docsBase = '/_docs';
        this.dropMenu = {
            dash: [
                {
                    'icon': 'icon-speedometer',
                    'type': 'parent',
                    'parent': 'Dashboard',
                    'routerLink': '/',
                }
            ],
            profile: [
                // {
                //   'icon': 'icon-user',
                //   'type': 'parent',
                //   'parent' : 'Profile',
                //   'routerLink' : '/',
                // },
                {
                    'icon': 'icon-settings',
                    'type': 'parent',
                    'parent': 'Settings',
                    'routerLink': '/settings',
                },
                {
                    'icon': 'icon-logout',
                    'type': 'parent',
                    'parent': 'Logout',
                    'routerLink': '/login',
                }
            ],
            operations: [
                {
                    'icon': 'icon-handbag',
                    'type': 'parent',
                    'parent': 'Orders',
                    'routerLink': '/orders',
                },
                {
                    'icon': 'icon-loop',
                    'type': 'parent',
                    'parent': 'Process',
                    'routerLink': '/Process',
                },
                {
                    'icon': 'icon-basket-loaded',
                    'type': 'parent',
                    'parent': 'Inventory',
                    'routerLink': '/',
                }
            ],
            presets: [
                {
                    'icon': 'icon-people',
                    'type': 'parent',
                    'parent': 'Contacts',
                    'routerLink': '/presets',
                    'hasSubMenu': true,
                    'subMenu': [
                        {
                            'type': 'sub',
                            'sub': 'Buyers',
                            'routerLink': '/presets/buyers',
                        },
                        {
                            'type': 'sub',
                            'sub': 'Vendors',
                            'routerLink': '/presets/vendors',
                        }
                    ]
                },
                {
                    'icon': 'icon-notebook',
                    'type': 'parent',
                    'parent': 'Process',
                    'routerLink': '/presets',
                    'hasSubMenu': true,
                    'subMenu': [
                        {
                            'type': 'sub',
                            'sub': 'Styles',
                            'routerLink': '/presets/styles',
                        },
                        {
                            'type': 'sub',
                            'sub': 'Jobs',
                            'routerLink': '/presets/jobs',
                        },
                        {
                            'type': 'sub',
                            'sub': 'Treatments',
                            'routerLink': '/presets/treatment',
                        }
                    ]
                },
                {
                    'icon': 'icon-layers',
                    'type': 'parent',
                    'parent': 'Materials',
                    'routerLink': 'presets',
                    'hasSubMenu': true,
                    'subMenu': [
                        {
                            'type': 'sub',
                            'sub': 'Fabric',
                            'routerLink': '/presets/fabrics',
                        },
                        {
                            'type': 'sub',
                            'sub': 'Accessories',
                            'routerLink': '/presets/accessories',
                        },
                        {
                            'type': 'sub',
                            'sub': 'Packers',
                            'routerLink': '/presets/packers',
                        }
                    ]
                }
            ]
        };
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