"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responseHelpers_1 = require("../utils/responseHelpers");
var catch404 = function (req, res, next) {
    res = res.status(404);
    responseHelpers_1.renderHelper(req, res, '404', {
        title: "Page Not Found"
    });
};
exports.default = catch404;
//# sourceMappingURL=catch404.js.map