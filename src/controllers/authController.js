import { signupService } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const newUser = await signupService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
