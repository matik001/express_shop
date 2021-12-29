import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import session from 'express-session';
import sessionFileStore from 'session-file-store'; 
const FileStore = sessionFileStore(session);

import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import configureHandlebars from './configs/handlebars';


import SECRED_KEYS from './configs/secred_keys';
import configureDatabase from "./configs/database";


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

configureHandlebars(app);

app.set('views', './views');
app.use(express.static('./static'));
app.use(cookieParser());

app.use(session({
  store: new FileStore({}),
  secret: SECRED_KEYS.SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(csrf());



declare module 'express-session' {
  interface SessionData {
    // views: number;
  }
}

const start = async ()=>{
  try {
    await configureDatabase();
    app.listen(3000);
  } catch (error) {
    console.log(error);    
  }
}


start();

