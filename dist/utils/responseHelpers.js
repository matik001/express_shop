"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHelper = void 0;
var homeNav = {
    name: 'home',
    path: '/',
    icon: '<i class="fa fa-fw fa-home"></i>'
};
var loginNav = {
    name: 'login',
    path: '/login',
    icon: '<i class="fa fa-fw fa-user"></i>'
};
var registerNav = {
    name: 'register',
    path: '/register',
    icon: '<i class="fa fa-fw fa-user"></i>'
};
var unauthenticatedNavs = [
    homeNav,
    loginNav,
    registerNav
];
exports.renderHelper = function (req, res, view, args) {
    var _a, _b, _c;
    var options = __assign(__assign({}, args), { title: (_a = args.title) !== null && _a !== void 0 ? _a : "Shop", activeNav: (_b = args.activeNav) !== null && _b !== void 0 ? _b : "home", navItems: (_c = args.navItems) !== null && _c !== void 0 ? _c : unauthenticatedNavs });
    res.render(view, options);
};
//# sourceMappingURL=responseHelpers.js.map