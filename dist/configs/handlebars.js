"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_handlebars_1 = require("express-handlebars");
var config_1 = __importDefault(require("./config"));
var configureHandlebars = function (app) {
    var hbs = express_handlebars_1.create({
        extname: '.hbs',
        helpers: {
            ternary: function (cond, ifTrue, ifFalse) {
                return cond ? ifTrue : ifFalse;
            },
            eq: function (a, b) {
                return a === b;
            },
            section: function (name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            }
            // bar() { return 'BAR!'; }
        }
    });
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    if (config_1.default.isProduction)
        app.enable('view cache');
};
exports.default = configureHandlebars;
//# sourceMappingURL=handlebars.js.map