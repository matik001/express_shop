import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { Order } from "./order";
import { User } from "./user";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(type=>Order, order=>order.owner)
    users: User[];

}
