import {NextFunction, Request, Response} from 'express';
import { WeatherService } from '../services/weather.service';

export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    async create(req: Request, res: Response, next: NextFunction) {

        try {
            const weather = await this.weatherService.createWeather(req.body);
            res.status(201).json(weather);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const weather = await this.weatherService.getAllWeather();
            res.json(weather);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const weather = await this.weatherService.getWeatherById(Number(req.params.id));
            res.json(weather);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const weather = await this.weatherService.updateWeather(
                Number(req.params.id),
                req.body
            );
            res.json(weather);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.weatherService.deleteWeather(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
