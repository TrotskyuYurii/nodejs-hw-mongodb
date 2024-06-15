import { createUser, loginUser } from "../services/auth.js";
import {setupSessionCookies} from '../utils/cookies.js';


export const registerUserController = async (req, res) => {
    const user = await createUser(req.body);
    const { password, ...userWithoutPassword } = user.toObject();
  
    res.json({
      status: 201,
      message: 'Successfully registered a user!',
      data: { user: userWithoutPassword },
    });
  };


  export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);
  
    setupSessionCookies(res, session);
  
    res.json({
      status: 200,
      message: 'User is logged in!',
      data: { accessToken: session.accessToken },
    });
  };