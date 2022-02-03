import { getDb } from "../configs/database";
import { Role } from "../entity/role.entity";

export enum Roles{
    Admin = 1
}

const seedRoles = async ()=>{
    const repo = getDb().getRepository(Role);
    const all = await repo.find();
    await repo.save({
        id: 1,
        name: 'admin'
    });

} 

export default seedRoles;