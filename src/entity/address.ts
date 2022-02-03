import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Order } from "./order";
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
    
    @Column()
    zipCode: string;
    
    @Column({nullable: true})
    street2: string;

    @Column({nullable: true})
    phone: string;

    @OneToMany(type=>Order, order=>order.address)
    orders: Order[];

    @ManyToOne(type=>User, user=>user.addresses)
    owner: User;

    
    toString() {
        return  `${this.street}, ${this.city}, ${this.zipCode}, ${this.country}, ${this.phone}`;
    }
    
}

