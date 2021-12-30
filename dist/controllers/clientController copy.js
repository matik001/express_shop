"use strict";
// import { Router, NextFunction, Response, Request } from "express";
// import Product from "../models/product";
// import CartHelper from "../models/cartHelper";
// import { IUserPopulated } from "../models/User";
// import Order, { IOrder } from "../models/order";
// import { renderHelper } from "../util/ResponseHelper";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
var responseHelpers_1 = require("../utils/responseHelpers");
// //// USERS
exports.getIndex = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // const products = await Product.find();
        responseHelpers_1.renderHelper(req, res, 'items', {
            title: "All products",
        });
        return [2 /*return*/];
    });
}); };
// export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
//     const products = await Product.find();
//     renderHelper(req, res, 'shop/product-list',{
//         products: products,
//         docTitle: 'Products',
//     });
// };
// export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;
//     const product = await Product.findById(id);
//     if (!product) {
//         console.log("ERROR: shop: getProduct --- product not found");
//         res.redirect('/');
//         return;
//     }
//     renderHelper(req, res, 'shop/product-detail',{
//         product: await product,
//         docTitle: product.title,
//     });
// };
// export const getCart = async (req: Request, res: Response, next: NextFunction) => {
//     const user = (await req.user!
//         .populate('cart.products.productId')
//         .execPopulate()) as IUserPopulated;
//     const cartProducts = user.cart.products;
//     const price = CartHelper.countPrice(cartProducts);
//     renderHelper(req, res, 'shop/cart',{
//         docTitle: 'My Cart',
//         products: cartProducts,
//         price: price
//     });
// };
// export const postCart = async (req: Request, res: Response, next: NextFunction) => {
//     const id =  req.body.productId;
//     const product = await Product.findById(id);
//     if(!product){
//         console.log("ERROR: shop: postCart --- product not found");
//         res.redirect('/');
//         return;
//     }
//     await req.user!.addToCart(product);
//     res.redirect("/cart");
// };
// // export const getCheckout = async (req: Request, res: Response, next: NextFunction) => {
// //     res.render('shop/checkout', {
// //         // products: await Product.fetchAll(), 
// //         docTitle: 'My Cart',
// //         path: '/shop/checkout'
// //     });
// // };
// export const postCartDeleteItem = async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.body.id;
//     await req.user!.removeFromCartOne(id);
//     res.redirect("/cart");
// }
// export const postCartDeleteItems = async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.body.id;
//     await req.user!.removeFromCartAll(id);
//     res.redirect("/cart");
// }
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
//# sourceMappingURL=clientController copy.js.map