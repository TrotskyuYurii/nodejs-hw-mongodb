import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {getAllContacts} from '../services/contacts.js';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../const/const.js';


export function setupServer() {

    //Ініціалізація сервера
    const app = express();
    
    app.use(pino());
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
        const allcontacts = await getAllContacts();
        res.json({
          status: 200,
          message: 'Successfully get all contacts!',
          data: allcontacts,
        });
      });

    
      //Отримання конкретного контакта за ID
      app.get('/contacts/:id', (req, res) => {
        res.status(200).json({
          message: 'contact with id: ' + req.params.id,
        });
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

