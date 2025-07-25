import { WeatherRepository } from '../repositories/weather.repository';
import { Prisma } from '../generated/prisma';

export class WeatherService {
    constructor(private weatherRepository: WeatherRepository) {}

    async createWeather(data: Prisma.WeatherRecordCreateInput) {
        return this.weatherRepository.create(data);
    }

    async getAllWeather() {
        return this.weatherRepository.findAll();
    }

    async getWeatherById(id: number) {
        const weather = await this.weatherRepository.findById(id);
        if (!weather) {
            throw new Error('Weather record not found');
        }
        return weather;
    }

    async updateWeather(id: number, data: Prisma.WeatherRecordUpdateInput) {
        await this.getWeatherById(id);
        return this.weatherRepository.update(id, data);
    }

    async deleteWeather(id: number) {
        await this.getWeatherById(id);
        return this.weatherRepository.delete(id);
    }
}
