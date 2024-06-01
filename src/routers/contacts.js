
import { Router } from "express"
import {getAllContacts,getContactsById} from '../services/contacts.js';



const contactsRouter = Router();




//обробка запитів
contactsRouter.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello, World!'
    });
});

//Отримання всіх контактів
contactsRouter.get('/contacts', async (req, res) => {
    const contactsfound = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contactsfound,
    });
});


//Отримання конкретного контакта за ID
contactsRouter.get('/contacts/:contactid', async (req, res) => {

    const id = req.params.contactid;

    try {

        const contactsfound = await getContactsById(id);

        if (!contactsfound || contactsfound.length === 0) {
            return res.status(404).json({
                status: 404,
                message: `Contact with id ${id} not found!`,
                data: [],
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data: contactsfound,
        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
            error: err.message,
        });
    }
});


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