import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Address } from "./address";
import { OrderItem } from "./orderItem";
import { User } from "./user";

export const OrderStatuses ={
    ORDERED: "ordered",
    SENT: "sent",
    FINISHED: "finished"
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    status: string;
    
    
    @Column('timestamptz')
    date: Date;
    

    @Column('double precision')
    totalPrice: number;
    

    @Column('double precision', {default: 20.0})
    deliveryPrice: number;
    

    @ManyToOne(type=>Address, address=>address.orders, {cascade: ['insert']})
    address: Address;
    

    @ManyToOne(type=>User, user=>user.createdOrders)
    customer: User;
    
    @ManyToOne(type=>User, user=>user.receivedOrders)
    seller: User;

    @OneToMany(type=>OrderItem, orderItem=>orderItem.order, {cascade: ['insert']})
    orderItems: OrderItem[];
    
}

