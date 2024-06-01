
import { Router } from "express"
import {getDefaultController, getAllContactsController, getContactsByIdController} from '../controllers/contacts.js';

const contactsRouter = Router();


//функція обгортки контролера
export const ctrlWrapper = (controller) => async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };



//обробка запитів
//Звернення по дефолтному маршруту
contactsRouter.get('/', ctrlWrapper(getDefaultController));

//Отримання всіх контактів
contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

//Отримання конкретного контакта за ID
contactsRouter.get('/contacts/:contactid', ctrlWrapper(getContactsByIdController));


//Обробка помилок при невідомих запитах
contactsRouter.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

//Обробка помилок при невідомії помилці
contactsRouter.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
    });
});


export default contactsRouter;