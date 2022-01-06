import { Express } from 'express'
import {User} from '../../entity/user'

declare global {
    namespace Express {
        interface Request {
            user?: User;
            isLoggedIn: boolean;
        }
    }
}
declare module 'express-session' {
    interface SessionData {
        userId?: number;
    }
}