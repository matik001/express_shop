import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Order } from "./order";
import { OrderItem } from "./orderItem";
import { User } from "./user";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    country: string;

    @Column()
    city: string;
    
    @Column()
    street: string;
    
    @OneToMany(type=>Order, order=>order.address)
    orders: Order[];

    @ManyToOne(type=>User, user=>user.addresses)
    owner: User;
}

