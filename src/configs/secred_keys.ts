import dotenv from 'dotenv';
dotenv.config();

const SECRED_KEYS = {
    SESSION: process.env['SESSION_SECRET']!,
}


export default SECRED_KEYS;