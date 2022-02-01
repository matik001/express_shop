import { NextFunction, Request, Response } from "express";
import { Like } from "typeorm";
import { getDb } from "../configs/database";
import { CartItem } from "../entity/cartItem";
import { Item } from "../entity/item";
import { Order, OrderStatuses } from "../entity/order";
import { OrderItem } from "../entity/orderItem";
import { User } from "../entity/user";
import { getValidationErrors, renderHelper } from "../utils/responseHelpers";


export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const phrase = req.query['phrase'] ?? '';
    const myItems = await getDb().getRepository(Item).find({
        where:[{
            deleted: false,
            owner: req.user,
            name: Like(`%${phrase}%`)
        },
        {
            deleted: false,
            owner: req.user,
            description: Like(`%${phrase}%`)
        }],
        relations: ['owner']
    })

    renderHelper(req, res, 'admin/myItems',{
        title: "My items",
        items: myItems,
    });
};

const DEAFAULT_IMAGE = 'https://previews.123rf.com/images/benchart/benchart1204/benchart120400018/13237662-illustration-of-a-cartoon-opened-brown-book.jpg';

export const getCreateItem = async (req: Request, res: Response, next: NextFunction) => {
    renderHelper(req, res, 'admin/editItem',{
        title: "Create item",
        edit: false,
        item: {
            imageUrl: DEAFAULT_IMAGE,
        } as Partial<Item>
    });
};

export const postCreateItem = async (req: Request, res: Response, next: NextFunction) => {
    const {price, name, description} = req.body;
    const imageUrl = req.file?.path ? '/'+req.file?.path : DEAFAULT_IMAGE;
    

    const errors = getValidationErrors(req);
    if(Object.keys(errors).length){
        res.locals.errors = errors;
        res.locals.oldInput = req.body;
        return next();
    }

    await getDb().getRepository(Item).save({
        imageUrl: imageUrl,
        name:name,
        description: description,
        price: price,
        owner: req.user,
    });
    res.redirect('/admin')
};

export const postDeleteItem = async (req: Request, res: Response, next: NextFunction) => {
    const itemId = parseInt(req.params.itemId);
    const item = await getDb().getRepository(Item).findOne({
        id: itemId,
        owner: req.user
    })
    if(!item)
        return res.redirect('/admin')
    
    item.deleted = true;
    await getDb().transaction(async db => {
            await db.getRepository(Item).save(item);
        
            const cartItems = await db.getRepository(CartItem).find({
                where:{
                    item: item,
                }
            });

            await db.getRepository(CartItem).remove(cartItems);
    });

    res.redirect('/admin')
};


export const getEditItem = async (req: Request, res: Response, next: NextFunction) => {
    const itemId = parseInt(req.params.itemId);
    const item = await getDb().getRepository(Item).findOne({id: itemId, owner: req.user})
    
    
    if(!item)
        return res.redirect('/admin')

    renderHelper(req, res, 'admin/editItem',{
        title: "Edit item",
        item: item,
        edit: true
    });
};

export const postEditItem = async (req: Request, res: Response, next: NextFunction) => {
    const errors = getValidationErrors(req);
    if(Object.keys(errors).length){
        res.locals.errors = errors;
        res.locals.oldInput = req.body;
        return next();
    }

    const itemId = parseInt(req.params.itemId);
    const item = await getDb().getRepository(Item).findOne({id: itemId, owner: req.user, deleted: false})
   
    const {price, name, description} = req.body;
    const imageUrl = req.file?.path ? '/'+req.file?.path : null;
   
   if(!item)
       return res.redirect('/admin')

    item.price = price;
    item.name = name;
    item.description = description;
    if(imageUrl)
        item.imageUrl = imageUrl;
    await getDb().getRepository(Item).save(item);

   res.redirect('/admin')
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await getDb().getRepository(User).find({
        relations: ['roles']
    });

    renderHelper(req, res, 'admin/users',{
        title: "Users",
        users: users,
    });
};



export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await getDb().getRepository(Order).find({
        where:{
            seller: req.user,
            
        },
        relations: [
            'address',
        ]
    })


    renderHelper(req, res, 'admin/manageOrders',{
        orders: orders, 
        title: 'My orders',
    });
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    const order = await getDb().getRepository(Order).findOne({
        where:{
            id: orderId,
            seller: req.user,
        },
        relations: [
            'address',
            'orderItems',
            'orderItems.item',
            // 'orderItems.item.owner',
        ]
    })
    if(!order){
        return res.redirect('/admin/manage-orders');
    }
    order.orderItems = order.orderItems.map(a=>({
        ...a,
        priceSum: a.amount * a.priceOne
    } as OrderItem));

    renderHelper(req, res, 'admin/manageOrder',{
        order: order, 
        title: 'My order',
    });
};


export const postMarkSentOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    const order = await getDb().getRepository(Order).findOne({
        where:{
            id: orderId,
            seller: req.user,
        },
    })
    if(!order || order.status != OrderStatuses.ORDERED){
        return res.redirect('/admin/manage-orders');
    }
    order.status = OrderStatuses.SENT;
    await getDb().getRepository(Order).save(order);
    return res.redirect('/admin/manage-orders');
};
