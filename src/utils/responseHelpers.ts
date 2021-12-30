import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { type } from "os";

type NavNames = 'login'|'register'|'home'|'contact';
interface NavItem{
    name: NavNames;
    path: string;
    icon: string;
}
const homeNav = {   
    name: 'home',
    path: '/',
    icon: '<i class="fa fa-fw fa-home"></i>'
} as NavItem;

const loginNav = {   
    name: 'login',
    path: '/login',
    icon: '<i class="fa fa-fw fa-user"></i>'
} as NavItem;

const registerNav = {   
    name: 'register',
    path: '/register',
    icon: '<i class="fa fa-fw fa-user"></i>'
} as NavItem;

const unauthenticatedNavs = [
    homeNav,
    loginNav,
    registerNav
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
        navItems: args.navItems ?? unauthenticatedNavs
        // path: args.path || view,
        // csrfToken: req.csrfToken(),
        // isAuthenticated: req.session!.isLoggedIn === true
    };
    res.render(view, options);
}
