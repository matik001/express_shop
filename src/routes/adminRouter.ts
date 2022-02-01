import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import { imageStorage } from "../configs/multer";
import { getCreateItem, getIndex, postCreateItem, postDeleteItem, getEditItem, postEditItem, getUsers, getOrders, getOrder, postMarkSentOrder } from "../controllers/adminController";
import hasRole from "../middleware/hasRole";
import { Roles } from "../seeding/seedRoles";
const adminRouter = Router();

const upload = multer({
    storage: imageStorage
})

adminRouter.get('/', hasRole(Roles.Admin), getIndex);
adminRouter.get('/create-item', hasRole(Roles.Admin), getCreateItem);
adminRouter.post('/create-item', hasRole(Roles.Admin), upload.single('imageUrl'), [
    body('name')
        .trim()
        .isLength({min: 4, max: 50}).withMessage("Name must have between 4 and 50 characters"),
    body('description')
        .trim()
        .isLength({max: 300}).withMessage("Description must have at most 300 characters"),
    body('price')
        .trim()
        .isFloat({min : 0}).withMessage("It is not valid price")
        .toFloat(),
],
postCreateItem, getCreateItem);


adminRouter.post('/delete-item/:itemId', hasRole(Roles.Admin), postDeleteItem);
adminRouter.get('/edit-item/:itemId', hasRole(Roles.Admin), getEditItem);
adminRouter.post('/edit-item/:itemId', hasRole(Roles.Admin), upload.single('imageUrl'), [
    body('name')
        .trim()
        .isLength({min: 4, max: 50}).withMessage("Name must have between 4 and 50 characters"),
    body('description')
        .trim()
        .isLength({max: 300}).withMessage("Description must have at most 300 characters"),
    body('price')
        .trim()
        .isFloat({min : 0}).withMessage("It is not valid price")
        .toFloat(),
], postEditItem, getEditItem);
adminRouter.get('/users', hasRole(Roles.Admin), getUsers);

adminRouter.get('/manage-orders', hasRole(Roles.Admin), getOrders);
adminRouter.get('/manage-order/:orderId', hasRole(Roles.Admin), getOrder);
adminRouter.post('/manage-order/:orderId/sentStatus', hasRole(Roles.Admin), postMarkSentOrder);

export default adminRouter;