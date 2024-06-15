import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserCollection } from '../models/user.js';
import { SessionCollection } from '../models/session.js';


const createSession = () => {
    return {
      accessToken: crypto.randomBytes(40).toString('base64'),
      refreshToken: crypto.randomBytes(40).toString('base64'),
      accessTokenValidUntil: Date.now() + 1000 * 60 * 15, // 15 minutes,
      refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days,
    };
  };



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
  
    await SessionCollection.deleteOne({ userId: user._id });
  
    return await SessionCollection.create({
      userId: user._id,
      ...createSession(),
    });
  };

  export const logoutUser = async ({ sessionId, sessionToken }) => {
    return await SessionCollection.deleteOne({
      _id: sessionId,
      refreshToken: sessionToken,
    });
  };