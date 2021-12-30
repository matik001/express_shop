"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var CONFIG = {
    isProduction: process.env.NODE_ENV === 'production',
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map