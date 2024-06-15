import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const rootRouter = Router();

// rootRouter.use('/students', studentsRouter);
// rootRouter.use('/auth', authRouter);

rootRouter.use(contactsRouter);
rootRouter.use(authRouter);

export default rootRouter;