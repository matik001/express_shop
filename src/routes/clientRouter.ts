import { Router } from "express";
import { body, query } from "express-validator";
import { getCart, getCheckout, getIndex, getOrder, getOrders, postAddToCart, postChangeCartAmount, postCheckout, postDeleteFromCart } from "../controllers/clientController";
const clientRouter = Router();

clientRouter.get('/', getIndex);

clientRouter.get('/cart', getCart);
clientRouter.post('/add-to-cart/:productId', postAddToCart);
clientRouter.post('/delete-from-cart/:productId', postDeleteFromCart);
clientRouter.post('/change-cart-amount/:productId', postChangeCartAmount);

clientRouter.get('/checkout', getCheckout);
clientRouter.post('/checkout', postCheckout, getCheckout);

clientRouter.get('/orders', getOrders);
clientRouter.get('/order/:orderId', getOrder);


export default clientRouter;