import dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
    isProduction: process.env.NODE_ENV  === 'production',
}


export default CONFIG;