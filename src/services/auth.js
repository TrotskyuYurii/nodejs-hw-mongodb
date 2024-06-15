import createHttpError from 'http-errors';
import { UserCollection } from '../models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';



export const createUser = async (payload) => {
    
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await UserCollection.findOne({ email: payload.email });
  
    if (user) {
      throw createHttpError(
        409,
        'User with this email is already present in database!',
      );
    }
  
    return await UserCollection.create({
      ...payload,
      password: hashedPassword,
    });
  };