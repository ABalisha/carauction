import { Router } from 'express';
import { getUsers, register } from '../controller/userController';
// USER ROUTES
const router = Router();

router.route('/').get(getUsers).post(register);

export default router;
