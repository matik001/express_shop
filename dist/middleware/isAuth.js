"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    if (!req.user) {
        return res.redirect("/login?returnUrl=" + req.url);
    }
    next();
});
//# sourceMappingURL=isAuth.js.map