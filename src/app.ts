import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store'; 
const FileStore = sessionFileStore(session);

import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import configureHandlebars from './configs/handlebars';
import SECRED_KEYS from './configs/secred_keys';
import configureDatabase from "./configs/database";
import clientRouter from "./routes/clientRouter";
import authRouter from "./routes/authRouter";
import catch404 from "./middleware/catch404";
import catch500 from "./middleware/catch500";


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

app.use(clientRouter);
app.use(authRouter);
app.use(catch404);
app.use(catch500);

declare global {
  namespace Express {
      interface Request {
          // user?: User;
          // isLoggedIn: boolean;
          // csrfToken: ()=>string; 
      }
  }
}
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

