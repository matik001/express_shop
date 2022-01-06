import { getDb } from "../configs/database";
import { Role } from "../entity/role";

export enum Roles{
    Admin = 1
}

const seedRoles = async ()=>{
    const repo = getDb().getRepository(Role);
    await repo.save({
        id: 1,
        name: 'admin'
    });

} 

export default seedRoles;