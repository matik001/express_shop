import {Connection, createConnection} from "typeorm";
import seedRoles from "../seeding/seedRoles";

var dbConnection:Connection|null = null;

export const configureDatabase = async ()=>{
    dbConnection = await createConnection();
    await seedRoles();
    console.log("Connected to database");
}

export const getDb = ()=>{
    return dbConnection!;
}
