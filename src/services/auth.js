import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserCollection } from '../models/user.js';
import { Session } from '../models/session.js';




export const createUser = async (payload) => {
    
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await UserCollection.findOne({ email: payload.email });
  
    if (user) {
      throw createHttpError(
        409,
        'Email in use',
      );
    }
  
    return await UserCollection.create({
      ...payload,
      password: hashedPassword,
    });
  };





  export const loginUser = async ({ email, password }) => {
    const user = await UserCollection.findOne({ email });
  
    if (!user) {
      throw createHttpError(401, 'User not found!');
    }
  
    const areEqual = await bcrypt.compare(password, user.password);
  
    if (!areEqual) {
      throw createHttpError(401, 'Unauthorized');
    }
  
    await Session.deleteOne({ userId: user._id });
  
    return await Session.create({
      userId: user._id,
      ...createSession(),
    });
  };