import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { CartItem } from "./cartItem";
import { Item } from "./item";
import { Order } from "./order";
import { Role } from "./role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Column()
    fullname: string;

    @Column()
    password: string;
    
    @OneToMany(type=>Item, item=>item.owner)
    items: Promise<Item[]>;

    @OneToMany(type=>CartItem, cartItem=>cartItem.owner)
    cartItems: Promise<CartItem[]>;

    @OneToMany(type=>Order, order=>order.owner)
    orders: Promise<Order[]>;

    @ManyToMany(type=>Role, role=>role.users)
    @JoinTable()
    roles: Role[];

    /// date of birth
}

