import { NextFunction, Request, Response } from "express";
import { renderHelper } from "../utils/responseHelpers";

const catch500 = (err:Error, req:Request, res:Response, next:NextFunction) => {
    res = res.status(500);
    renderHelper(req, res, '500', {
        title: 'Server issue'
    })
}

export default catch500;