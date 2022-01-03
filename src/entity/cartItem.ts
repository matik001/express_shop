import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Item } from "./item";
import { User } from "./user";

@Entity()
export class CartItem {

    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    amount: number;
    
    @ManyToOne(type=>User, user=>user.cartItems)
    owner: User;

    @ManyToOne(type=>Item, item=>item.cartItems)
    item: Item;
}

