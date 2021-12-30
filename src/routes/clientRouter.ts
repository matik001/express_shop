import { Router } from "express";
import { getIndex } from "../controllers/clientController";
const clientRouter = Router();

clientRouter.get('/', getIndex);
export default clientRouter;