import {Request, Response, NextFunction} from 'express';

export default (redirectPaht:string = '/')=>{
    return (req:Request, res:Response, next:NextFunction)=>{
            if(req.user){
                return res.redirect(redirectPaht);
            }
        next();
    }
}    
