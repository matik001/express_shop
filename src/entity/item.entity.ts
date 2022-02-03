import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, RelationOptions} from "typeorm";
import { CartItem } from "./cartItem.entity";
import { OrderItem } from "./orderItem.entity";
import { User } from "./user.entity";

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

    @Column({default: false})
    deleted: boolean = false;

    @ManyToOne(type=>User, user=>user.items)
    owner: User;
    
    @OneToMany(type=>OrderItem, orderItem=>orderItem.item)
    orderItems: OrderItem[];
    
    @OneToMany(type=>CartItem, cartItem=>cartItem.item)
    cartItems: CartItem[];
    

    
}

