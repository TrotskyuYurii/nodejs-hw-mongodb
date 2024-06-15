import { Router } from "express"
import {registerUserController} from '../controllers/auth.js';
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import {registerUserSchema} from '../validation/registerUserSchema.js';


const authRouter = Router();

//обробка запитів
//Створення нового користувача
authRouter.post('/register', validateBody(registerUserSchema),ctrlWrapper(registerUserController));




export default authRouter;