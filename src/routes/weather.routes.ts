import { Router } from 'express';
import { WeatherController } from '../controllers/weather.controller';

export const WeatherRoutes = (weatherController: WeatherController) => {
    const router = Router();

    router.post('/', (req, res, next) => weatherController.create(req, res, next));
    router.get('/', (req, res, next) => weatherController.getAll(req, res, next));
    router.get('/:id', (req, res, next) => weatherController.getById(req, res, next));
    router.put('/:id', (req, res, next) => weatherController.update(req, res, next));
    router.delete('/:id', (req, res, next) => weatherController.delete(req, res, next));

    return router;
};
