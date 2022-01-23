// import { Router, NextFunction, Response, Request } from "express";
// import Product from "../models/product";
// import CartHelper from "../models/cartHelper";
// import { IUserPopulated } from "../models/User";
// import Order, { IOrder } from "../models/order";
// import { renderHelper } from "../util/ResponseHelper";

import { ADDRGETNETWORKPARAMS } from "dns";
import { NextFunction, Request, Response } from "express";
import { Like } from "typeorm";
import { getDb } from "../configs/database";
import { Address } from "../entity/address";
import { CartItem } from "../entity/cartItem";
import { Item } from "../entity/item";
import { Order, OrderStatuses } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
import { User } from "../entity/user";
import { renderHelper } from "../utils/responseHelpers";

// //// USERS

export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const phrase = req.query['phrase'] ?? '';
    const items = await getDb().getRepository(Item).find({
        where:[{
            deleted: false,
            name: Like(`%${phrase}%`)
        },
        {
            deleted: false,
            description: Like(`%${phrase}%`)
        }],
        relations: ['owner']
    })
    renderHelper(req, res, 'user/items',{
        title: "All products",
        items: items,
    });
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const cartItems = await getDb().getRepository(CartItem).find({
        where:{
            owner: req.user,
        },
        relations: ['item']
    });
    /// TODO remove items with deleted flag from cart
    renderHelper(req, res, 'user/cart',{
        title: "Cart",
        cartItems: cartItems
    });
};
export const postAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    const id =  req.params.productId;
    const item = await getDb().getRepository(Item).findOne(id);
    if(!item){
        console.log("ERROR: product not found");
        res.redirect('/');
        return;
    }
    const newCartItem = (await getDb().getRepository(CartItem).findOne({
        where:{
            item: item,
            owner: req.user
        }
    })) ?? {
        owner: req.user,
        item: item,
    } as CartItem;

    newCartItem.amount = 1;

    await getDb().getRepository(CartItem).save(newCartItem);

    res.redirect("/cart");
};

export const postDeleteFromCart = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const cartItem = await getDb().getRepository(CartItem).findOne({
        where:{
            item: {id: productId},
            owner: req.user
        }
    });
    if(cartItem)
        await getDb().getRepository(CartItem).delete(cartItem);
    res.redirect("/cart");
}
export const getCheckout = async (req: Request, res: Response, next: NextFunction) => {
    const cartItems = await getDb().getRepository(CartItem).find({
        where:{
            owner: req.user,
        },
        relations: ['item']
    });

    renderHelper(req, res, 'user/checkout',{
        title: 'Checkout',
        cartItems: cartItems
    });
};

const countPrice = (cartItems:CartItem[])=>{
    let sum = 0.0;
    for (const a of cartItems) {
        sum += (a.amount*a.item.price);
    }
    return sum;
}
export const postCheckout = async (req: Request, res: Response, next: NextFunction) => {
    const cartItems = await getDb().getRepository(CartItem).find({
        where:{
            owner: req.user,
        },
        relations: ['item']
    });
    const newOrder = new Order();
    newOrder.address = {
        city: "City of Angels",
        country: "Neverland",
        street: "JP 2",
        owner: req.user,
    } as Address;
    newOrder.owner = req.user!;
    newOrder.status = OrderStatuses.ORDERED;
    newOrder.totalPrice = countPrice(cartItems);
    newOrder.orderItems = cartItems.map(a=>({
        amount: a.amount,
        item: a.item,
        priceOne: a.item.price,
    }) as OrderItem);
    newOrder.date = new Date();

    await getDb().getRepository(Order).save(newOrder);
    await getDb().manager.remove(cartItems);
    res.redirect('/orders'); /// TODO order id
};


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await getDb().getRepository(Order).find({
        where:{
            owner: req.user
        }
    })


    renderHelper(req, res, 'user/orders',{
        orders: orders, 
        title: 'My orders',
    });
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    const order = await getDb().getRepository(Order).findOne({
        where:{
            id: orderId,
            owner: req.user
        }
    })


    renderHelper(req, res, 'user/order',{
        order: order, 
        title: 'My order',
    });
};