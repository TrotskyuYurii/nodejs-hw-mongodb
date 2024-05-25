import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../const/const.js';


export function setupServer() {

    const app = express();
    // app.use(pino(
    //   {
    //     transport:{
    //       target: 'pino-pretty',}}
    
    // )),(req, res) => {
    //   console.log(req.body);
    // };
    
    
    app.get('/', (req, res) => {
      res.json({
        message: 'Hello, World!'
      });
    });
    
    
    const PORT = env(ENV_VARS.PORT, 3000);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}

