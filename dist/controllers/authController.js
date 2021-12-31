"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.postRegister = exports.getRegister = exports.postLogin = exports.getLogin = void 0;
var database_1 = require("../configs/database");
var user_1 = require("../entity/user");
var responseHelpers_1 = require("../utils/responseHelpers");
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.getLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        responseHelpers_1.renderHelper(req, res, 'login', {
            title: "Login",
            activeNav: 'login',
        });
        return [2 /*return*/];
    });
}); };
exports.postLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, validPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, database_1.getDb().getRepository(user_1.User).findOne({
                        where: { email: email }
                    })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                validPassword = _b.sent();
                if (validPassword) {
                    req.session.userId = user.id;
                    req.session.save(function (err) {
                        var _a;
                        console.log(err);
                        res.redirect((_a = req.query.returnUrl) !== null && _a !== void 0 ? _a : '/');
                    });
                    return [2 /*return*/];
                }
                _b.label = 3;
            case 3:
                res.locals.oldInput = {
                    email: email,
                    password: password,
                };
                res.locals.error = "Wrong email or password";
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.getRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        responseHelpers_1.renderHelper(req, res, 'register', {
            title: "Register",
            activeNav: 'register',
        });
        return [2 /*return*/];
    });
}); };
exports.postRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, fullname, password, confirmPassword, errors, salt, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, fullname = _a.fullname, password = _a.password, confirmPassword = _a.confirmPassword;
                errors = responseHelpers_1.getValidationErrors(req);
                if (Object.keys(errors).length) {
                    res.locals.errors = errors;
                    res.locals.oldInput = {
                        email: email,
                        fullname: fullname,
                        password: password,
                        confirmPassword: confirmPassword
                    };
                    return [2 /*return*/, next()];
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 1:
                salt = _c.sent();
                _b = {
                    email: email,
                    fullname: fullname
                };
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 2:
                user = (_b.password = _c.sent(),
                    _b);
                return [4 /*yield*/, database_1.getDb().getRepository(user_1.User).save(user)];
            case 3:
                _c.sent();
                // const msg = {
                //     to: email,
                //     from: 'mateusz.kisiel.mk@gmail.com',
                //     subject: 'Confirm your email',
                //     // text: 'and easy to do anywhere, even with Node.js',
                //     html: '<strong>Click to confirm your email</strong>',
                // };
                // sendgrid.send(msg).catch(error=>console.log(error));
                req.session.userId = user.id;
                req.session.save(function (err) {
                    var _a;
                    res.redirect((_a = req.query.returnUrl) !== null && _a !== void 0 ? _a : '/');
                });
                return [2 /*return*/];
        }
    });
}); };
exports.postLogout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.session.destroy(function (err) {
            var _a;
            if (err)
                console.log(err);
            res.redirect((_a = req.query.returnUrl) !== null && _a !== void 0 ? _a : '/');
        });
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=authController.js.map