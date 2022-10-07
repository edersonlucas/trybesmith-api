import { Router } from 'express';
import UserController from '../controllers/UserController';
import userMiddleware from '../middlewares/userMiddleware';

const router = Router();

const userController = new UserController();

router.post('/users', userMiddleware, userController.createUser);

export default router;