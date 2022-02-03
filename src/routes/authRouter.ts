import { Router } from "express";
import { body } from "express-validator";
import passport from "passport";
import { getDb } from "../configs/database";
import { getLogin, getRegister, postLogin, postLogout, postRegister } from "../controllers/authController";
import { User } from "../entity/user.entity";
import isAuth from "../middleware/isAuth";
import isNotAuth from "../middleware/isNotAuth";
const authRouter = Router();


authRouter.get('/login', isNotAuth(), getLogin);
authRouter.post('/login', isNotAuth('/'), postLogin, getLogin);




authRouter.get('/register', isNotAuth(), getRegister);

authRouter.post('/register', isNotAuth(), [
    body('email')
        .trim()
        .isEmail().withMessage("Email is invalid")
        .bail()
        .custom(async (value)=>{
            const user = await getDb().getRepository(User).findOne({ email: value});
            if(user)
                throw new Error('Email already exists');
            return true;
        })
        .normalizeEmail(),

    body('password')
        .trim()
        .isLength({min: 5}).withMessage("Password should have at least 5 characters")
        .isAlphanumeric().withMessage("Password may only consist of text and digits"),

    body('confirmPassword')
        .trim()
        .custom((value, {req}) => value===req.body!.password )
        .withMessage("Passwords are different")
], postRegister, getRegister);



authRouter.post('/logout', isAuth, postLogout);

// authRouter.get('/reset-password', getResetPassword);
// authRouter.post('/reset-password', postResetPassword);
// authRouter.get('/new-password/:token', isNotAuth('/'), getNewPassword);
// authRouter.post('/new-password', isNotAuth('/'), postNewPassword);


authRouter.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

authRouter.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        // successRedirect: '/',
        failureRedirect: '/login',
}), (req, res)=>{
    req.session.save(()=>{
        res.redirect('/');
    });
});

authRouter.get('/auth/facebook',
  passport.authenticate('facebook', { scope : ['email'] }));


authRouter.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', {
        // successRedirect: '/',
        failureRedirect: '/login',
}), (req, res)=>{
    req.session.save(()=>{
        res.redirect('/');
    });
});



export default authRouter;