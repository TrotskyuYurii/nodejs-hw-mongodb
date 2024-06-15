import { createUser } from "../services/auth.js";

export const registerUserController = async (req, res) => {
    const user = await createUser(req.body);
  
    res.json({
      status: 200,
      message: 'User is created!',
      data: { user },
    });
  };