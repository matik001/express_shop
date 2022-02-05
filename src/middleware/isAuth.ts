import {Request, Response, NextFunction} from 'express';

export default (req:Request, res:Response, next:NextFunction)=>{
    if(!req.user){
        let params = '';
        if(req.method == 'get')
            params = `?returnUrl=${req.originalUrl}`;
            
        return res.redirect(`/login${params}`);
    }
    next();
}

