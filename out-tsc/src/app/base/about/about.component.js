"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// SEO
var platform_browser_1 = require("@angular/platform-browser");
var AboutComponent = /** @class */ (function () {
    function AboutComponent(meta, title) {
        // SEO Config
        title.setTitle('My WebPack About Page');
        meta.addTags([
            { name: 'author', content: 'vvs' },
            { name: 'keywords', content: 'angular seo, angular 4 universal, etc' },
            { name: 'description', content: 'Now you are in About Page, This is my Angular SEO-based App, enjoy it!' }
        ]);
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-about',
                    templateUrl: './about.component.html',
                    styleUrls: ['./about.component.scss']
                },] },
    ];
    /** @nocollapse */
    AboutComponent.ctorParameters = function () { return [
        { type: platform_browser_1.Meta, },
        { type: platform_browser_1.Title, },
    ]; };
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map