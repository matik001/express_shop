import { join } from "path";
import {Connection, createConnection, Entity, getConnectionOptions} from "typeorm";
import seedRoles from "../seeding/seedRoles";
import ENV_KEYS from "./envKeys";

var dbConnection:Connection|null = null;


export const configureDatabase = async ()=>{

    const entitiesPath = join(__dirname, `../**/*.entity{.ts,.js}`);
    const migrationsPath = join(__dirname, `../**/migration/*{.ts,.js}`);

    const baseConnectionOpts = await getConnectionOptions();

    dbConnection = await createConnection({
        ...baseConnectionOpts,
        // username: ENV_KEYS.TYPEORM_USERNAME,
        // password: ENV_KEYS.TYPEORM_PASSWORD,
        // host: ENV_KEYS.TYPEORM_HOST,
        // type: ENV_KEYS.TYPEORM_CONNECTION as any,
        // port: ENV_KEYS.TYPEORM_PORT,
        entities: [
             entitiesPath,
        ],
        migrations: [
            migrationsPath
        ],
        synchronize: false,
        logging: false,
        extra: {
            ssl: true
        }
    });
    await seedRoles();
    console.log("Connected to database");
}

export const getDb = ()=>{
    return dbConnection!;
}
