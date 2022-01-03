import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany} from "typeorm";
import { CartItem } from "./cartItem";
import { OrderItem } from "./orderItem";
import { User } from "./user";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('double precision')
    price: number;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    imageUrl: string;


    @ManyToOne(type=>User, user=>user.items)
    owner: User;
    
    @OneToMany(type=>OrderItem, orderItem=>orderItem.item)
    orderItems: OrderItem[];
    
    @OneToMany(type=>CartItem, cartItem=>cartItem.item)
    cartItems: CartItem[];
    
    
}

