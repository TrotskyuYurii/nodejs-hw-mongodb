import { Router } from "express"
import {getDefaultController, getAllContactsController, getContactsByIdController, postNewContactController,patchContactsByIdController,deleteContactsByIdController} from '../controllers/contacts.js';
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import {contactsCreateBodySchema} from '../validation/contactsCreateBodySchema.js';
import {contactsPatchBodySchema} from '../validation/contactsPatchBodySchema.js';

const contactsRouter = Router();



//обробка запитів
//Звернення по дефолтному маршруту
contactsRouter.get('/', ctrlWrapper(getDefaultController));

//Отримання всіх контактів
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

//Отримання конкретного контакта за ID
contactsRouter.get('/contacts/:contactid', ctrlWrapper(getContactsByIdController));

//Створення нового контакту
contactsRouter.post('/contacts', validateBody(contactsCreateBodySchema),ctrlWrapper(postNewContactController));

//Оновлення конкретного контакта за ID
contactsRouter.patch('/contacts/:contactid', validateBody(contactsPatchBodySchema), ctrlWrapper(patchContactsByIdController));

//Видалення конкретного контакта за ID
contactsRouter.delete('/contacts/:contactid',ctrlWrapper(deleteContactsByIdController));


// //Обробка помилок при невідомих запитах
// contactsRouter.use('*', (req, res, next) => {

//     res.status(404).json({
//         message: 'Route not found',
//     });

// });

// //Обробка помилок при невідомії помилці
// contactsRouter.use((err, req, res, next) => {
//     res.status(500).json({
//         message: 'Something went wrong',
//         error: err.message,
//     });
// });


export default contactsRouter;