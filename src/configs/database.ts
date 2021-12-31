import {Connection, createConnection} from "typeorm";

var dbConnection:Connection|null = null;

export const configureDatabase = async ()=>{
    dbConnection = await createConnection();
    console.log("Connected to database");
}

export const getDb = ()=>{
    return dbConnection!;
}
