"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_component_1 = require("./../../app.component");
var core_1 = require("@angular/core");
// SEO
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(meta, title, router, appComponent) {
        this.router = router;
        this.appComponent = appComponent;
        // SEO Config
        title.setTitle('My BEKYCG Home Page');
        meta.addTags([
            { name: 'author', content: 'vvs' },
            { name: 'keywords', content: 'angular seo, angular 4 universal, etc' },
            { name: 'description', content: 'This is my Angular SEO-based App, enjoy it!' }
        ]);
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-home',
                    templateUrl: './home.component.html',
                    styleUrls: ['./home.component.scss']
                },] },
    ];
    /** @nocollapse */
    HomeComponent.ctorParameters = function () { return [
        { type: platform_browser_1.Meta, },
        { type: platform_browser_1.Title, },
        { type: router_1.Router, },
        { type: app_component_1.AppComponent, },
    ]; };
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map