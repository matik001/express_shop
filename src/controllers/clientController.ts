import { ADDRGETNETWORKPARAMS } from "dns";
import { NextFunction, Request, Response } from "express";
import { CircularRelationsError, Like } from "typeorm";
import { updateCall } from "typescript";
import { getDb } from "../configs/database";
import { Address } from "../entity/address.entity";
import { CartItem } from "../entity/cartItem.entity";
import { Item } from "../entity/item.entity";
import { Order, OrderStatuses } from "../entity/order.entity";
import { OrderItem } from "../entity/orderItem.entity";
import { User } from "../entity/user.entity";
import { renderHelper } from "../utils/responseHelpers";

// //// USERS

export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const phrase = req.query['phrase'] as string ?? '';
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
        phrase: phrase,
    });
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const cartItems = (await getDb().getRepository(CartItem).find({
        where:{
            owner: req.user,
        },
        relations: ['item', 'item.owner']
    })).map(a=>({
        ...a,
        priceSum: countPrice([a])
    })) as CartItem[];

    const totalItemsPrice = countPrice(cartItems);

    if(cartItems.length == 0){
        return renderHelper(req, res, 'user/empty-cart',{
            title: "Empty cart",
        });    
    }
    renderHelper(req, res, 'user/cart',{
        title: "Cart",
        cartItems: cartItems,
        totalItemsPrice: totalItemsPrice
    });
};
export const postAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    const id =  req.params.productId;
    const item = await getDb().getRepository(Item).findOne({
        where:{
            id: id,
            deleted: false,
        }
    });
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
    const cartItems = (await getDb().getRepository(CartItem).find({
        where:{
            owner: req.user,
        },
        relations: ['item']
    })).map(a=>({
        ...a,
        priceSum: countPrice([a])
    })) as CartItem[];

    const addresses = await getDb().getRepository(Address).find({
        where: {
            owner: req.user
        }
    });

    const deliveryPrice = 20;
    const totalItemsPrice = countPrice(cartItems);
    const totalPrice = deliveryPrice + totalItemsPrice;

    renderHelper(req, res, 'user/checkout',{
        title: 'Checkout',
        cartItems: cartItems,
        totalItemsPrice: totalItemsPrice,
        deliveryPrice: deliveryPrice,
        totalPrice: totalPrice,
        addresses: addresses,  

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
    const {address : addressId, city, phone, street, zipCode} = req.body;

    let address : Address | undefined = undefined;
    if(addressId === 'new'){
        const newAddress = new Address();
        newAddress.city = city;
        newAddress.phone = phone;
        newAddress.street = street;
        newAddress.zipCode = zipCode;
        newAddress.owner = req.user!;
        newAddress.country = "Polska";

        address = await getDb().getRepository(Address).save(newAddress);
    }
    else{
        address = await getDb().getRepository(Address).findOne({
            where:{
                id: addressId,
                owner: req.user
            }
        });
    }
    if(!address){
        res.locals.oldInput = req.body;
        return next();
    }
    const cartItems = await getDb().getRepository(CartItem).find({
        where:{
            owner: req.user,
        },
        relations: ['item', 'item.owner']
    });
    const newOrder = new Order();
    newOrder.customer = req.user!;
    newOrder.seller = cartItems[0].item.owner;
    newOrder.status = OrderStatuses.ORDERED;
    newOrder.deliveryPrice = 20;
    newOrder.totalPrice = countPrice(cartItems) + newOrder.deliveryPrice;

    newOrder.orderItems = cartItems.map(a=>({
        amount: a.amount,
        item: a.item,
        priceOne: a.item.price,
    }) as OrderItem);
    newOrder.address = address;
    newOrder.date = new Date();

    await getDb().getRepository(Order).save(newOrder);
    await getDb().manager.remove(cartItems);
    res.redirect('/orders');
};


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await getDb().getRepository(Order).find({
        where:{
            customer: req.user
        },
        relations: [
            'address',
            'seller',
        ]
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
            customer: req.user
        },
        relations: [
            'address',
            'orderItems',
            'seller',
            'orderItems.item',
            // 'orderItems.item.owner',
        ]
    })
    if(!order){
        return res.redirect('/orders');
    }
    order.orderItems = order.orderItems.map(a=>({
        ...a,
        priceSum: a.amount * a.priceOne
    } as OrderItem));

    renderHelper(req, res, 'user/order',{
        order: order, 
        title: 'My order',
    });
};

export const postChangeCartAmount = async (req: Request, res: Response, next: NextFunction) => {
    const productId = parseInt(req.params.productId);
    const amount = parseInt(req.body.amount);
    const item = await getDb().getRepository(Item).findOne(productId);

    const cartItem = (await getDb().getRepository(CartItem).findOne({
        where:{
            item: item,
            owner: req.user
        }
    })) as CartItem;

    if(!item || isNaN(amount) || isNaN(productId) || !cartItem){
        res.redirect('/cart');
        return;
    }

    cartItem.amount = amount;
    await getDb().getRepository(CartItem).save(cartItem);

    res.redirect('/cart');
};


export const postMarkReceivedOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    const order = await getDb().getRepository(Order).findOne({
        where:{
            id: orderId,
            seller: req.user,
        },
    })
    if(!order || order.status != OrderStatuses.SENT){
        return res.redirect('/admin/manage-orders');
    }
    order.status = OrderStatuses.FINISHED;
    await getDb().getRepository(Order).save(order);
    return res.redirect('/admin/manage-orders');
};
