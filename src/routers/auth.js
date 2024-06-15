import { Router } from "express"
import {registerUserController, loginUserController, logoutController} from '../controllers/auth.js';
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import {registerUserSchema} from '../validation/registerUserSchema.js';
import {loginUserSchema} from '../validation/loginUserSchema.js';


const authRouter = Router();

//обробка запитів
authRouter.post('/register', validateBody(registerUserSchema),ctrlWrapper(registerUserController));
authRouter.post('/login',validateBody(loginUserSchema),ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutController));




export default authRouter;