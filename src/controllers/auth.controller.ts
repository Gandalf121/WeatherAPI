import {NextFunction, Request, Response} from 'express';
import {AuthService} from "../services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try
        {
            const login = await this.authService.login(req.body);

             res.status(200).json(login);
        } catch (error)
        {
            next(error);
        }

    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const createUser = await this.authService.register(req.body);

             res.status(200).json(createUser);
        }catch (error)
        {
            next(error);
        }

    }
}