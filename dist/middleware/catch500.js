"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responseHelpers_1 = require("../utils/responseHelpers");
var catch500 = function (err, req, res, next) {
    console.log(err);
    res = res.status(500);
    responseHelpers_1.renderHelper(req, res, '500', {
        title: 'Server issue'
    });
};
exports.default = catch500;
//# sourceMappingURL=catch500.js.map