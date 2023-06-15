import "reflect-metadata";

import express, { Express } from "express";
import { User as AppUser } from "./entity/user.entity";
export {};

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Request {
      user?: User;
    }
  }
}

// declare namespace Express {
//   export interface User extends AppUser {}
//   export interface Request {
//     user?: User;
//   }
// }

/// nodemon z ts-node się czasami buguje przy przeładowaniu, bo passportjs wprowadza swój typ User do Request, wtedy trzeba powyższy blok zakomentować i po chwili odkomentować

import bodyParser from "body-parser";
import session from "express-session";
import sessionFileStore from "session-file-store";
const FileStore = sessionFileStore(session);

import csrf from "csurf";
import cookieParser from "cookie-parser";
import configureHandlebars from "./configs/handlebars";
import ENV_KEYS from "./configs/envKeys";
import clientRouter from "./routes/clientRouter";
import authRouter from "./routes/authRouter";
import catch404 from "./middleware/catch404";
import catch500 from "./middleware/catch500";
import catch403 from "./middleware/catch403";
import { configureDatabase } from "./configs/database";
import adminRouter from "./routes/adminRouter";
import passportConfig from "./configs/passport";
import flash from "connect-flash";

console.log(
  `Running in ${ENV_KEYS.IS_PRODUCTION ? "production" : "development"}`
);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

configureHandlebars(app);

app.set("views", "./views");
app.use("/upload/images", express.static("./upload/images"));
app.use(express.static("./static"));
app.use(cookieParser());

app.use(
  session({
    store: new FileStore({ logFn: function () {} }),
    secret: ENV_KEYS.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(flash());
app.use(csrf());

passportConfig(app);

app.use(clientRouter);
app.use(authRouter);
app.use("/admin", adminRouter);
app.use(catch404);
app.use(catch403);
app.use(catch500);

const start = async () => {
  try {
    await configureDatabase();
    app.listen(ENV_KEYS.PORT);
  } catch (error) {
    console.log(error);
  }
};

start();
