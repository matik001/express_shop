// import {User as AppUser} from './entity/user';
// import express, {Express, Request} from 'express';

// declare global {
//   namespace Express {
//     interface User extends AppUser {}
//     interface Request {
//       user?: User
//     }
//   }
// }

// declare module 'fastify-passport' {
//   interface User {
//     [key in keyof AppUser]: AppUser[key]
//   }
// }