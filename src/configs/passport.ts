import passport from 'passport';
import express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import { getDb } from './database';
import { User } from '../entity/user.entity';
import bcrypt from 'bcrypt';
import ENV_KEYS from './envKeys';
import { genRandomStrongPassword } from '../utils/passwordEncryptHelper';
const passportConfig = (app: express.Express) => {
    ///// --------------------- LOCAL STRATEGY ---------------------
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, cb) => {
        const user = await getDb().getRepository(User).findOne({
            where: { email: email }
        });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                return cb(null, user);
            }
        }
        return cb(null, false, { message: 'Incorrect username or password.' });
    }));

    ///// --------------------- GOOGLE STRATEGY ---------------------
    passport.use(new GoogleStrategy({
        clientID: ENV_KEYS.GOOGLE_CLIENT_ID,
        clientSecret: ENV_KEYS.GOOGLE_SECRET,
        callbackURL: ENV_KEYS.GOOGLE_CALLBACK,
        passReqToCallback: true
    },
        async (request, accessToken, refreshToken, profile, done) => {
            const repo = getDb().getRepository(User)

            let user = await repo.findOne({where:{
                googleId:  profile.id,
            }})
            if(!user){
                user = {
                    googleId: profile.id,
                    fullname: profile.displayName,
                    email: profile.emails![0].value,
                    password: await genRandomStrongPassword(),
                } as User;
                await repo.save(user);
            }
            
            return done(null, user);
        }
    ));

    ///// --------------------- FACEBOOK STRATEGY ---------------------

    passport.use(new FacebookStrategy({
        clientID: ENV_KEYS.FACEBOOK_CLIENT_ID,
        clientSecret: ENV_KEYS.FACEBOOK_CLIENT_SECRET,
        profileFields: ['id', 'emails', 'displayName'],
        callbackURL: ENV_KEYS.FACEBOOK_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        const repo = getDb().getRepository(User)

        let user = await repo.findOne({where:{
            facebookId:  profile.id,
        }})
        if(!user){
            user = {
                facebookId: profile.id,
                fullname: profile.displayName,
                email: profile.emails![0].value,
                password: await genRandomStrongPassword(),
            } as User;
            await repo.save(user);
        }
        
        return done(null, user);
      }));

    ///// --------------------- MIDDLEWARES STRATEGY ---------------------


    passport.serializeUser((user, cb) => {
        cb(null, (user as User).id);
    });

    passport.deserializeUser(async (userId: number, cb) => {
        const user = await getDb().getRepository(User).findOne(userId, { relations: ['roles'] });
        if (!user) {
            cb('ERROR: user does not exists!');
            return;
        }
        return cb(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());
}

export default passportConfig;


