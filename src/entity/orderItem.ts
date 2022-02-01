import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Item } from "./item";
import { Order } from "./order";

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    amount: number;
    
    @Column('double precision')
    priceOne: number;
    
    @ManyToOne(type=>Order, order=>order.orderItems)
    order: Order;
    
    @ManyToOne(type=>Item, item=>item.orderItems)
    item: Item;


}

