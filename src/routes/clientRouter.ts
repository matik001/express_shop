import { Router } from "express";
import { body, query } from "express-validator";
import { getCart, getCheckout, getIndex, getOrder, getOrders, postAddToCart, postChangeCartAmount, postCheckout, postDeleteFromCart, postMarkReceivedOrder } from "../controllers/clientController";
import isAuth from "../middleware/isAuth";
const clientRouter = Router();

clientRouter.get('/', getIndex);

clientRouter.get('/cart', isAuth, getCart);
clientRouter.post('/add-to-cart/:productId',  isAuth, postAddToCart);
clientRouter.post('/delete-from-cart/:productId',  isAuth, postDeleteFromCart);
clientRouter.post('/change-cart-amount/:productId', isAuth, postChangeCartAmount);

clientRouter.get('/checkout', isAuth, getCheckout);
clientRouter.post('/checkout',  isAuth, postCheckout, getCheckout);

clientRouter.get('/orders', isAuth, getOrders);
clientRouter.get('/order/:orderId', isAuth, getOrder);
clientRouter.post('/orders/:orderId/receivedStatus', isAuth, postMarkReceivedOrder);


export default clientRouter;