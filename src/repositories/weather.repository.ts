import { PrismaClient, Prisma } from '../generated/prisma';

export class WeatherRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: Prisma.WeatherRecordCreateInput) {
        return this.prisma.weatherRecord.create({ data });
    }

    async findAll() {
        return this.prisma.weatherRecord.findMany();
    }

    async findById(id: number) {
        return this.prisma.weatherRecord.findUnique({ where: { id } });
    }

    async update(id: number, data: Prisma.WeatherRecordUpdateInput) {
        return this.prisma.weatherRecord.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prisma.weatherRecord.delete({ where: { id } });
    }
}
