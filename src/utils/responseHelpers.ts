import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { type } from "os";
import { parse } from "url";
import { Item } from "../entity/item";
import hasRole from "../middleware/hasRole";
import { Roles } from "../seeding/seedRoles";

type NavNames = 'Login'|'Register'|'Home'|'Contact'|'Logout'|'My items' | "None";
interface NavItem{
    name: NavNames;
    path: string;
    icon: string;
    float: 'left'|'right';
    method: 'GET' | 'POST'
}
const homeNav = {   
    name: 'Home',
    path: '/',
    icon: '<i class="fa fa-fw fa-home"></i>',
    float: 'left',
    method: 'GET',
} as NavItem;

const adminItemsNav = {   
    name: 'My items',
    path: '/admin',
    icon: '<i class="fa fa-fw fa-cubes"></i>',
    float: 'left',
    method: 'GET',
} as NavItem;

const loginNav = {   
    name: 'Login',
    path: '/login',
    icon: '<i class="fa fa-fw fa-sign-in"></i>',
    method: 'GET',
    float: 'right'
} as NavItem;

const registerNav = {   
    name: 'Register',
    path: '/register',
    icon: '<i class="fa fa-fw fa-user-plus"></i>',
    method: 'GET',
    float: 'right'
} as NavItem;
const logoutNav = {   
    name: 'Logout',
    path: '/logout',
    icon: '<i class="fas fa-sign-out-alt"></i>',
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
const adminNavs = [
    homeNav,
    adminItemsNav,
    logoutNav
]

interface RenderParams{
    title?: string;
    activeNav?: NavNames;
    navItems?: NavItem[];
    items?: Item[];
    item?: Partial<Item>;
    returnUrl?: string;
    edit?: boolean;
}
export const renderHelper = (req: Request, res: Response, view: string, args: RenderParams) => {
    const isAdmin = req.user?.roles.some(a=>a.id === Roles.Admin) ?? false;


    let navs = args.navItems;
    if(!navs){
        if(!req.isLoggedIn)
            navs = unauthenticatedNavs;
        else if(isAdmin)
            navs = adminNavs;
        else
            navs = userNavs;
    }
    const path = parse(req.originalUrl).pathname;
    const activeNavTitle = navs.find(a=>a.path === path)?.name ?? "None"; 


    const options = {
        ...args,
        title: args.title ?? "Shop",
        activeNav: args.activeNav ?? activeNavTitle,
        navItems: navs,
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