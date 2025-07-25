import {AuthRepository} from "../repositories/auth.repository";
import { Prisma } from '../generated/prisma';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async register(data: Prisma.UserCreateInput) {
        const { email, password } = data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.authRepository.create({
            name: data.name,
            password: hashedPassword,
            email:data.email,
            city: {
                connect: { id: Number(data.city) }
            },
            role: {
                connect: { id: Number(data.role) }
            }

        })
    }

    async login(data: Prisma.UserCreateInput) {
        const { email, password } = data;
        const user = await this.authRepository.findByEmail(email);
        const secretKey = process.env.JWT_SECRET!;

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET не задан в .env');
        }

        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Неверный пароль');
        }

        const payload = { sub: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return { accessToken: token };

    }

}