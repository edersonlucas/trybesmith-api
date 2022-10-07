import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const router = Router();

const loginController = new LoginController();

router.post('/login', loginMiddleware, loginController.login);

export default router;