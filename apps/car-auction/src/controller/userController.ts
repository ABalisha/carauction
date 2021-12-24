import { statusCodes } from '../data/statuscode';
import { Request, Response } from 'express';
import { getAllUsers, registerUser } from '../services/userService';
export const getUsers = async (req, res) => {
  try {
    res.status(statusCodes.ok.status).json({ message: await getAllUsers() });
  } catch (e) {
    res
      .status(statusCodes.BadRequest.status)
      .json({ message: statusCodes.BadRequest.message });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    console.log('i was here');
    if (req.body.password) {
      await registerUser(req.body.username, req.body.password, req.body.email, null);
      res.status(statusCodes.ok.status).json({ message: statusCodes.ok.message });
    }
    else {
      res
        .status(statusCodes.BadRequest.status)
        .json({ message: statusCodes.BadRequest.message });
    }
  } catch (e) {
    res
      .status(statusCodes.BadRequest.status)
      .json({ message: statusCodes.BadRequest.message });
    console.log(e);
  }
};
