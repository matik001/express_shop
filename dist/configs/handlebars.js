"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_handlebars_1 = require("express-handlebars");
var configureHandlebars = function (app) {
    var hbs = express_handlebars_1.create({
        helpers: {
        // foo() { return 'FOO!'; },
        // bar() { return 'BAR!'; }
        }
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
};
exports.default = configureHandlebars;
//# sourceMappingURL=handlebars.js.map