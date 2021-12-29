import {createConnection} from "typeorm";
import { User } from "../entity/user";

const configureDatabase = async ()=>{
    const connection = await createConnection();
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;

    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
}


export default configureDatabase;