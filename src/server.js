import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './const/const.js';

import contactsRouter from './routers/contacts.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';


//Запуск сервера
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

    //Додавання middleware для парсингу JSON
    app.use(
      express.json({
        limit: '1mb',
        type: ['application/json', 'application/vnd.api+json'],
      }),
    );
    
    //Підключення маршрутів
    app.use(contactsRouter);

    //підключення обробників помилок
    app.use(errorHandlerMiddleware);
    app.use(notFoundHandler);


    //Запуск сервера
    const PORT = env(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
}

