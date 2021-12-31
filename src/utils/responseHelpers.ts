import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { type } from "os";

type NavNames = 'login'|'register'|'home'|'contact'|'logout';
interface NavItem{
    name: NavNames;
    path: string;
    icon: string;
    float: 'left'|'right';
    method: 'GET' | 'POST'
}
const homeNav = {   
    name: 'home',
    path: '/',
    icon: '<i class="fa fa-fw fa-home"></i>',
    float: 'left',
    method: 'GET',
} as NavItem;

const loginNav = {   
    name: 'login',
    path: '/login',
    icon: '<i class="fa fa-fw fa-sign-in"></i>',
    method: 'GET',
    float: 'right'
} as NavItem;

const registerNav = {   
    name: 'register',
    path: '/register',
    icon: '<i class="fa fa-fw fa-user-plus"></i>',
    method: 'GET',
    float: 'right'
} as NavItem;
const logoutNav = {   
    name: 'logout',
    path: '/logout',
    icon: '<i class="fa fa-fw fa-sign-out"></i>',
    method: 'POST',
    float: 'right'
} as NavItem;

const unauthenticatedNavs = [
    homeNav,
    loginNav,
    registerNav
]
const userNavs = [
    homeNav,
    logoutNav
]

interface RenderParams{
    title?: string;
    activeNav?: NavNames;
    navItems?: NavItem[];
}
export const renderHelper = (req: Request, res: Response, view: string, args: RenderParams) => {
    const options = {
        ...args,
        title: args.title ?? "Shop",
        activeNav: args.activeNav ?? "home",
        navItems: args.navItems ?? (req.isLoggedIn ? userNavs : unauthenticatedNavs),
        csrfToken: req.csrfToken(),
        // path: args.path || view,
        // isAuthenticated: req.session!.isLoggedIn === true
    };
    res.render(view, options);
}

export const getValidationErrors = (req:Request)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
        return {};

    const res =  errors.array().reduce((acc:any, v)=>{
        acc[v.param] = (acc[v.param] ? [...acc[v.param], v.msg] : [v.msg]);
        return acc;
    }, {}) as Record<string, string[]>;
    
    return res;
}