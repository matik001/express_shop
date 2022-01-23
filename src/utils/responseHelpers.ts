import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { type } from "os";
import { parse } from "url";
import { CartItem } from "../entity/cartItem";
import { Item } from "../entity/item";
import { Order } from "../entity/order";
import { User } from "../entity/user";
import hasRole from "../middleware/hasRole";
import { Roles } from "../seeding/seedRoles";

type NavNames = 'Login'|'Register'|'Home'|'Contact'|'Logout'|'My items' | 'Cart' | "Users" | "None";
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
    icon: '<i class="far fa-user"></i>',
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

const cartNav = {
    name: 'Cart',
    path: '/cart',
    icon: '<i class="fa fa-shopping-cart"></i>',
    method: 'GET',
    float: 'right'
} as NavItem;

const usersNav = {
    name: 'Users',
    path: '/admin/users',
    icon: '<i class="fas fa-users"></i>',
    method: 'GET',
    float: 'left'
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
    registerNav,
    loginNav,
]
const userNavs = [
    homeNav,
    logoutNav,
    cartNav,
]
const adminNavs = [
    homeNav,
    adminItemsNav,
    usersNav,
    logoutNav,
    cartNav,
]

interface RenderParams{
    title?: string;
    activeNav?: NavNames;
    navItems?: NavItem[];
    items?: Item[];
    cartItems?: CartItem[];
    item?: Partial<Item>;
    returnUrl?: string;
    edit?: boolean;
    users?: User[];
    orders?: Order[];
    order?: Order;
    phrase?: string;
    totalPrice?: string;
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