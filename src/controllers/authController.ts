import { NextFunction, Request, Response } from "express";
import { getDb } from "../configs/database";
import { User } from "../entity/user.entity";
import { getValidationErrors, renderHelper } from "../utils/responseHelpers";
import bcrypt from 'bcrypt';
import session from "express-session";
import passport from "passport";

export const getLogin = async (req: Request, res: Response, next: NextFunction) => {
    renderHelper(req, res, 'login',{
        title: "Login",
        returnUrl: req.query.returnUrl as string ?? '/',
    });
}



export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        
        if (!user){
            const {email, password}= req.body;

            res.locals.oldInput = {
                email, 
                password,
            }
            res.locals.error = "Wrong email or password";
            
            next();
            return;
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.session.save(()=>{
                res.redirect(req.query.returnUrl as string ?? '/');
            });
        });  
    })(req, res, next);
}

export const getRegister = async (req: Request, res: Response, next: NextFunction) => {
    renderHelper(req, res, 'register',{
        title: "Register",
    });
}
export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    const {email,fullname, password, confirmPassword} = req.body;
    

    const errors = getValidationErrors(req);
    if(Object.keys(errors).length){
        res.locals.errors = errors;
        res.locals.oldInput = {
            email, 
            fullname,
            password,
            confirmPassword
        }
        return next();
    }

    
    const salt = await bcrypt.genSalt(10);

    const user =  {
        email: email,
        fullname: fullname,
        password: await bcrypt.hash(password, salt)

   } as User;
    await getDb().getRepository(User).save(user);

    // const msg = {
    //     to: email,
    //     from: 'mateusz.kisiel.mk@gmail.com',
    //     subject: 'Confirm your email',
    //     // text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>Click to confirm your email</strong>',
    // };
    // sendgrid.send(msg).catch(error=>console.log(error));

    req.login(user, (err:any)=>{
        req.session.save(()=>{
            res.redirect(req.query.returnUrl as string ?? '/');     
        });
    })
}


  



export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    // req.logOut();
    // res.redirect(req.query.returnUrl as string ?? '/');
    req.session.destroy(err=>{
        if(err)
            console.log(err);
        res.redirect(req.query.returnUrl as string ?? '/');
    })
}