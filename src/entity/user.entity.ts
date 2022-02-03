import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Address } from "./address.entity";
import { CartItem } from "./cartItem.entity";
import { Item } from "./item.entity";
import { Order } from "./order.entity";
import { Role } from "./role.entity";

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
    
    @Column({nullable: true})
    googleId: string;
    
    @Column({nullable: true})
    facebookId: string;
    

    @OneToMany(type=>Item, item=>item.owner)
    items: Promise<Item[]>;

    @OneToMany(type=>CartItem, cartItem=>cartItem.owner)
    cartItems: Promise<CartItem[]>;

    @OneToMany(type=>Order, order=>order.customer)
    createdOrders: Promise<Order[]>;
    
    @OneToMany(type=>Order, order=>order.seller)
    receivedOrders: Promise<Order[]>;

    @OneToMany(type=>Address, order=>order.owner)
    addresses: Promise<Address[]>;

    @ManyToMany(type=>Role, role=>role.users)
    @JoinTable()
    roles: Role[];

    /// date of birth
}

