import { user } from '../models/user';
import * as bcrypt from 'bcrypt'
export const getAllUsers = () => {
  try {
    return user.findAll();
  } catch (e) {
    console.log(e.message);
    return;
  }
};
export const registerUser = async (
  username: string,
  password: string,
  email: string,
  idGoogle: string
) => {
  if (password != null) {
    return user.create({

      user: username,
      GoogleID: null,
      password: await bcrypt.hash(password, 15),
      email: email,
    });
  }
  else {
    return user.create({

      user: username,
      GoogleID: idGoogle,
      password: null,
      email: email,
    });
  }
};
