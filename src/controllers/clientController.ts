// import { Router, NextFunction, Response, Request } from "express";
// import Product from "../models/product";
// import CartHelper from "../models/cartHelper";
// import { IUserPopulated } from "../models/User";
// import Order, { IOrder } from "../models/order";
// import { renderHelper } from "../util/ResponseHelper";

import { NextFunction, Request, Response } from "express";
import { getDb } from "../configs/database";
import { CartItem } from "../entity/cartItem";
import { Item } from "../entity/item";
import { User } from "../entity/user";
import { renderHelper } from "../utils/responseHelpers";

// //// USERS

export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const items = await getDb().getRepository(Item).find({
        where:{
            deleted: false
        },
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

    res.render('user/checkout',{
        title: 'Checkout',
        cartItems: cartItems
    });
};


// export const postCreateOrder = async (req: Request, res: Response, next: NextFunction) => {
//     const user = await req.user!.populate('cart.products.productId').execPopulate() as IUserPopulated;

//     await Order.create({
//         userId: req.user!._id,
//         products: user.cart.products.map(p=>({
//             cnt: p.cnt,
//             product: {
//                 price: p.productId.price,
//                 productId: p.productId._id,
//                 title: p.productId.title
//             },
//         })),
//         price: CartHelper.countPrice(user.cart.products)
//     } as IOrder);
//     await user.removeFromCartAll();
//     res.redirect('/orders');
// }

// export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
//     const orders = await Order.find({userId: req.user!.id})
//         // .populate('products.product.productId')
//         .exec();


//     renderHelper(req, res, 'shop/orders',{
//         orders: orders, 
//         docTitle: 'My orders',
//     });
// };