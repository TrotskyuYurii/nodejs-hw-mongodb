import { createUser } from "../services/auth.js";

export const registerUserController = async (req, res) => {
    const user = await createUser(req.body);
    const { password, ...userWithoutPassword } = user.toObject();
  
    res.json({
      status: 201,
      message: 'Successfully registered a user!',
      data: { user: userWithoutPassword },
    });
  };