import { NextFunction, Request, Response } from "express";
import { renderHelper } from "../utils/responseHelpers";

const catch404 = (req:Request, res:Response, next:NextFunction) => {
    res = res.status(404);
    renderHelper(req,res,'404',{
        title: "Page Not Found"
    });
}

export default catch404;