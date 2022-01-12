import { Router } from "express";
import { body, query } from "express-validator";
import { getCart, getIndex, postAddToCart, postDeleteFromCart } from "../controllers/clientController";
const clientRouter = Router();

clientRouter.get('/', getIndex);

clientRouter.get('/cart', getCart);
clientRouter.post('/add-to-cart/:productId', postAddToCart);
clientRouter.post('/delete-from-cart/:productId', postDeleteFromCart);

export default clientRouter;