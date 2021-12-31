"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (redirectPaht) {
    if (redirectPaht === void 0) { redirectPaht = '/'; }
    return function (req, res, next) {
        if (req.user) {
            return res.redirect(redirectPaht);
        }
        next();
    };
});
//# sourceMappingURL=isNotAuth.js.map