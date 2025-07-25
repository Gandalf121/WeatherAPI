import express from 'express';
import { PrismaClient } from './generated/prisma';
import { WeatherRepository } from './repositories/weather.repository';
import { WeatherService } from './services/weather.service';
import { WeatherController } from './controllers/weather.controller';
import {AuthController} from "./controllers/auth.controller";
import {AuthService} from "./services/auth.service";
import {AuthRepository} from "./repositories/auth.repository";
import { WeatherRoutes } from './routes/weather.routes';
import {AuthRoutes} from "./routes/auth.routes";
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());


const weatherRepository = new WeatherRepository(prisma);
const weatherService = new WeatherService(weatherRepository);
const weatherController = new WeatherController(weatherService);

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);




app.use('/api/weather', WeatherRoutes(weatherController));
app.use('/api/auth', AuthRoutes(authController));

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});
