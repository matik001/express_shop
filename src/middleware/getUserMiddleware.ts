
import {Request, Response, NextFunction} from 'express';
import { getDb } from '../configs/database';
import { User } from '../entity/user';

export default async (req:Request, res:Response, next:NextFunction)=>{
    req.isLoggedIn = false;
    if(req.session!.userId){
        const user = await getDb().getRepository(User).findOne(req.session!.userId);
        if (!user) {
            console.log("ERROR: user does not exists!");
            req.session.destroy((err)=>{
                if(err) 
                    console.log(err);
                res.redirect('/');
            });
            return;
        }
        req.user = user!;
        req.isLoggedIn = true;
    }
    next();
}

