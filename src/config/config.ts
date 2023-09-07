import dotenv from 'dotenv';
// import { APP_ORIGIN, AUTH_AUDIENCE, AUTH_ISSUER } from './authReferences';
// import { getEnvVar } from '../utils/getEnvVar'

type TConfig = { [key: string]: EnvironmentConfig };

type EnvironmentConfig = {
    app: AppConfig;
    db: MongoDBConfig;
    //  auth: AuthConfig
};

type AppConfig = { PORT: string | number };
type MongoDBConfig = { URI: string };
type AuthConfig = {
    origin: string;
    audience: string;
    issuer: string;
}

if (process.env.NODE_ENV === 'production') dotenv.config({ path: '.env.production' });
else dotenv.config({ path: '.env.development' });

const ENV = process.env.NODE_ENV ?? 'development';


const CONFIG: TConfig = {
    development: {
        app: {
            PORT: process.env.PORT || 4001,
        },
        db: {
            URI: process.env.MONGO_DB_URI || ''
        },
        // auth: {
        //   origin: getEnvVar(APP_ORIGIN),
        //   audience: getEnvVar(AUTH_AUDIENCE),
        //   issuer: getEnvVar(AUTH_ISSUER),
        // }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4002,
        },
        db: {
            URI: process.env.MONGO_DB_URI || ''
        },
        // auth: {
        //   origin: getEnvVar(APP_ORIGIN),
        //   audience: getEnvVar(AUTH_AUDIENCE),
        //   issuer: getEnvVar(AUTH_ISSUER),
        // }
    },
};
console.log(CONFIG)

export const CLOUDINARY_CLOUD_NAME = process.env['CLOUDINARY_NAME']
export const CLOUDINARY_API_KEY = process.env['CLOUDINARY_API_KEY']
export const CLOUDINARY_API_SECRET = process.env['CLOUDINARY_API_SECRET']

export default CONFIG[ENV];