import { NextFunction, Request, Response } from "express";


const catch403 = (err:any, req:Request, res:Response, next:NextFunction) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
  
    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
}

export default catch403;