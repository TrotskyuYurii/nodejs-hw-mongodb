import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {getAllContacts,getContactsById} from '../services/contacts.js';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../const/const.js';


export const setupServer=()=> {

    //Ініціалізація сервера
    const app = express();
    
    // app.use(pino());
    // app.use(
    //     pino({
    //       transport: {
    //         target: 'pino-pretty',
    //       },
    //     }),
    //   );
    app.use(cors());
    
    

    //Запуск сервера
    const PORT = env(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    




    //обробка запитів
    app.get('/', (req, res, next) => {
      res.status(200).json({
        message: 'Hello, World!'
      });
    });

    //Отримання всіх контактів
    app.get('/contacts', async (req, res) => {
        const contactsfound = await getAllContacts();
        res.status(200).json({
          status: 200,
          message: 'Successfully found contacts!',
          data: contactsfound,
        });
      });

    
      //Отримання конкретного контакта за ID
      app.get('/contacts/:contactid', async (req, res) => {
        
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
    app.use('*', (req, res, next) => {
        res.status(404).json({
          message: 'Route not found',
        });
      });
      
    //Обробка помилок при невідомії помилці
      app.use((err, req, res, next) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
      });

}

