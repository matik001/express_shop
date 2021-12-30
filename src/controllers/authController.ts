import { NextFunction, Request, Response } from "express";
import { renderHelper } from "../utils/responseHelpers";


export const getLogin = async (req: Request, res: Response, next: NextFunction) => {
    renderHelper(req, res, 'login',{
        title: "Login",
        activeNav: 'login',
        // products: products,
    });
}
export const getRegister = async (req: Request, res: Response, next: NextFunction) => {
    renderHelper(req, res, 'register',{
        title: "Register",
        activeNav: 'register',
        // products: products,
    });
}