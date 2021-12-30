"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var clientController_1 = require("../controllers/clientController");
var clientRouter = express_1.Router();
clientRouter.get('/', clientController_1.getIndex);
exports.default = clientRouter;
//# sourceMappingURL=clientRouter.js.map