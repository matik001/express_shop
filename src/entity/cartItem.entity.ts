import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Item } from "./item.entity";
import { User } from "./user.entity";

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

