import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import { imageStorage } from "../configs/multer";
import { getCreateItem, getIndex, postCreateItem, postDeleteItem, getEditItem, postEditItem } from "../controllers/adminController";
import hasRole from "../middleware/hasRole";
import { Roles } from "../seeding/seedRoles";
const adminRouter = Router();

const upload = multer({
    storage: imageStorage
})

adminRouter.get('/', hasRole(Roles.Admin), getIndex);
adminRouter.get('/create-item', hasRole(Roles.Admin), getCreateItem);
adminRouter.post('/create-item', hasRole(Roles.Admin), [
    body('name')
        .trim(),
    body('desciption')
        .trim(),
    body('price')
        .trim()
        .isNumeric()
        .toFloat(),
],
upload.single('imageUrl'),
postCreateItem);
adminRouter.post('/delete-item/:itemId', hasRole(Roles.Admin), postDeleteItem);
adminRouter.get('/edit-item/:itemId', hasRole(Roles.Admin), getEditItem);
adminRouter.post('/edit-item/:itemId', hasRole(Roles.Admin), upload.single('imageUrl'), postEditItem);

export default adminRouter;