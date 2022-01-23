import dotenv from 'dotenv';
dotenv.config();

const ENV_KEYS = {
    IS_PRODUCTION: process.env.NODE_ENV  === 'production',
    SESSION_SECRET: process.env['SESSION_SECRET']!,
    GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID']!,
    GOOGLE_SECRET: process.env['GOOGLE_SECRET']!
}


export default ENV_KEYS;