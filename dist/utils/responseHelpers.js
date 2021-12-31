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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationErrors = exports.renderHelper = void 0;
var express_validator_1 = require("express-validator");
var homeNav = {
    name: 'home',
    path: '/',
    icon: '<i class="fa fa-fw fa-home"></i>',
    float: 'left',
    method: 'GET',
};
var loginNav = {
    name: 'login',
    path: '/login',
    icon: '<i class="fa fa-fw fa-sign-in"></i>',
    method: 'GET',
    float: 'right'
};
var registerNav = {
    name: 'register',
    path: '/register',
    icon: '<i class="fa fa-fw fa-user-plus"></i>',
    method: 'GET',
    float: 'right'
};
var logoutNav = {
    name: 'logout',
    path: '/logout',
    icon: '<i class="fa fa-fw fa-sign-out"></i>',
    method: 'POST',
    float: 'right'
};
var unauthenticatedNavs = [
    homeNav,
    loginNav,
    registerNav
];
var userNavs = [
    homeNav,
    logoutNav
];
exports.renderHelper = function (req, res, view, args) {
    var _a, _b, _c;
    var options = __assign(__assign({}, args), { title: (_a = args.title) !== null && _a !== void 0 ? _a : "Shop", activeNav: (_b = args.activeNav) !== null && _b !== void 0 ? _b : "home", navItems: (_c = args.navItems) !== null && _c !== void 0 ? _c : (req.isLoggedIn ? userNavs : unauthenticatedNavs), csrfToken: req.csrfToken() });
    res.render(view, options);
};
exports.getValidationErrors = function (req) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty())
        return {};
    var res = errors.array().reduce(function (acc, v) {
        acc[v.param] = (acc[v.param] ? __spread(acc[v.param], [v.msg]) : [v.msg]);
        return acc;
    }, {});
    return res;
};
//# sourceMappingURL=responseHelpers.js.map