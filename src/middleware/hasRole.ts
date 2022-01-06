import {Request, Response, NextFunction} from 'express';
import { Roles } from '../seeding/seedRoles';

export default (...roles:Roles[])=>(req:Request, res:Response, next:NextFunction)=>{
    if(!req.user){
        return res.redirect(`/login?returnUrl=${req.originalUrl}`);
    }

    const ok = roles.every(role=>{
        return req.user!.roles.some((v,_)=>v.id === role)
    });
    if(!ok){
        return res.redirect(req.query['returnUrl']?.toString() ?? '/');
    }
    next();
}

