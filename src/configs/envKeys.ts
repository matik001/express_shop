import dotenv from 'dotenv';
dotenv.config();

const ENV_KEYS = {
    IS_PRODUCTION: process.env.NODE_ENV  === 'production',
    PORT: process.env['PORT']!,
    SESSION_SECRET: process.env['SESSION_SECRET']!,
    GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID']!,
    GOOGLE_SECRET: process.env['GOOGLE_SECRET']!,
    FACEBOOK_CLIENT_ID: process.env['FACEBOOK_CLIENT_ID']!,
    FACEBOOK_CLIENT_SECRET: process.env['FACEBOOK_CLIENT_SECRET']!,
    TYPEORM_CONNECTION: process.env['TYPEORM_CONNECTION']!,
    TYPEORM_HOST: process.env['TYPEORM_HOST']!,
    TYPEORM_USERNAME: process.env['TYPEORM_USERNAME']!,
    TYPEORM_PASSWORD: process.env['TYPEORM_PASSWORD']!,
    TYPEORM_DATABASE: process.env['TYPEORM_DATABASE']!,
    TYPEORM_PORT: parseInt(process.env['TYPEORM_PORT']!),
    GOOGLE_CALLBACK: process.env['GOOGLE_CALLBACK']!,
    FACEBOOK_CALLBACK: process.env['FACEBOOK_CALLBACK']!,
}


export default ENV_KEYS;