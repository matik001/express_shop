"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var authRouter = express_1.Router();
authRouter.get('/register', authController_1.getRegister);
authRouter.get('/login', authController_1.getLogin);
// authRouter.get('/login', isNotAuth('/'), getLogin);
// authRouter.post('/login', isNotAuth('/'),[
//     body('email')
//         .trim()
//         .normalizeEmail(),
//     body('password')
//         .trim()
// ], postLogin);
// authRouter.post('/logout', isAuth, postLogout);
// authRouter.get('/signup', isNotAuth('/'), getSignup);
// authRouter.post('/signup', isNotAuth('/'), [
//     body('email')
//         .trim()
//         .isEmail().withMessage("Email is invalid")
//         .bail()
//         .custom(async (value)=>{
//             const user = await User.findOne({email: value});
//             if(user)
//                 throw new Error('Email exists already');
//             return true;
//         })
//         .normalizeEmail(),
//     body('password')
//         .trim()
//         .isLength({min: 5}).withMessage("Password should have at least 5 characters")
//         .isAlphanumeric().withMessage("Password may only consist of text and digits")
//         .custom((value, {req}) => value===req.body!.confirmPassword )
//             .withMessage("Passwords are different"),
//     body('confirmPassword')
//         .trim()
// ], postSignup);
// authRouter.get('/reset-password', getResetPassword);
// authRouter.post('/reset-password', postResetPassword);
// authRouter.get('/new-password/:token', isNotAuth('/'), getNewPassword);
// authRouter.post('/new-password', isNotAuth('/'), postNewPassword);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map