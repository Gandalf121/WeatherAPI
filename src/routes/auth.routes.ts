import {Router} from 'express';
import {AuthController} from "../controllers/auth.controller";

export const AuthRoutes = (authController: AuthController) => {
    const router = Router();

    router.post('/login', (req, res, next) => authController.login(req, res, next));
    router.post('/register', (req, res, next) => authController.register(req, res, next));

    return router;
}