import { NextFunction, Request, Response } from "express";
import { getDb } from "../configs/database";
import { Item } from "../entity/item";
import { renderHelper } from "../utils/responseHelpers";


export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const myItems = await getDb().getRepository(Item).find({
        owner: req.user,
        deleted: false
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
    await getDb().getRepository(Item).save(item);

    /// remove from carts

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
