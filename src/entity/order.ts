import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { OrderItem } from "./orderItem";
import { User } from "./user";

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
    
    
    @ManyToOne(type=>User, user=>user.items)
    owner: User;


    @OneToMany(type=>OrderItem, orderItem=>orderItem.order)
    orderItems: OrderItem[];

}

