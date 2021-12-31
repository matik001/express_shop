"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var catch403 = function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    // handle CSRF token errors here
    res.status(403);
    res.send('form tampered with');
};
exports.default = catch403;
//# sourceMappingURL=catch403.js.map