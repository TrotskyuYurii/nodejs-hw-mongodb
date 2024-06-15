import { Router } from "express"
import {registerUserController, loginUserController} from '../controllers/auth.js';
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import {registerUserSchema} from '../validation/registerUserSchema.js';
import {loginUserSchema} from '../validation/loginUserSchema.js';


const authRouter = Router();

//обробка запитів
//Створення нового користувача
authRouter.post('/register', validateBody(registerUserSchema),ctrlWrapper(registerUserController));

//Login user
authRouter.post('/login',validateBody(loginUserSchema),ctrlWrapper(loginUserController));




export default authRouter;