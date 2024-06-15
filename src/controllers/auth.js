import { createUser, loginUser } from "../services/auth.js";

export const setupSessionCookies = (res, session) => {
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expire: 7 * 24 * 60 * 60,
    });
    res.cookie('sessionToken', session.refreshToken, {
      httpOnly: true,
      expire: 7 * 24 * 60 * 60,
    });
  };



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
      message: 'Successfully logged in an user!',
      data: { accessToken: session.accessToken },
    });
  };