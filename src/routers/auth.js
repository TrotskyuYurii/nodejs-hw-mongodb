import { Router } from "express"
import {getDefaultController, getAllContactsController, getContactsByIdController, postNewContactController,patchContactsByIdController,deleteContactsByIdController} from '../controllers/contacts.js';
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js';


const authRouter = Router();



//обробка запитів
//Звернення по дефолтному маршруту
// authRouter.get('/auth', ctrlWrapper(getDefaultController));




export default authRouter;