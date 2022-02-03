import passport from 'passport';
import express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getDb } from './database';
import { User } from '../entity/user';
import bcrypt from 'bcrypt';
import ENV_KEYS from './envKeys';

const passportConfig = (app: express.Express) => {
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

    passport.use(new GoogleStrategy({
        clientID: ENV_KEYS.GOOGLE_CLIENT_ID,
        clientSecret: ENV_KEYS.GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
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
                    password: Math.random().toString(36).substring(2, 20),
                } as User;
                await repo.save(user);
            }
            
            return done(null, user);
        }
    ));
    /*
{
  id: '103530246196936187658',
  displayName: 'Mateusz Kisiel',
  name: { familyName: 'Kisiel', givenName: 'Mateusz' },
  emails: [ { value: 'mateusz.kisiel.mk@gmail.com', verified: true } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a-/AOh14GgcMF7c4t7gAYipDcPZIGyiA9rnVHJhKv06DPA1=s96-c'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "103530246196936187658",\n' +
    '  "name": "Mateusz Kisiel",\n' +
    '  "given_name": "Mateusz",\n' +
    '  "family_name": "Kisiel",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a-/AOh14GgcMF7c4t7gAYipDcPZIGyiA9rnVHJhKv06DPA1\\u003ds96-c",\n' +
    '  "email": "mateusz.kisiel.mk@gmail.com",\n' +
    '  "email_verified": true,\n' +
    '  "locale": "pl"\n' +
    '}',
  _json: {
    sub: '103530246196936187658',
    name: 'Mateusz Kisiel',
    given_name: 'Mateusz',
    family_name: 'Kisiel',
    picture: 'https://lh3.googleusercontent.com/a-/AOh14GgcMF7c4t7gAYipDcPZIGyiA9rnVHJhKv06DPA1=s96-c',
    email: 'mateusz.kisiel.mk@gmail.com',
    email_verified: true,
    locale: 'pl'
  }
}
    */


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


