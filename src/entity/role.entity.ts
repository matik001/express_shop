import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { Order } from "./order.entity";
import { User } from "./user.entity";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(type=>Order, order=>order.customer)
    users: User[];

}

