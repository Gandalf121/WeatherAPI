import { PrismaClient, Prisma } from '../generated/prisma';

export class AuthRepository {
    constructor(private prisma: PrismaClient) {}

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    async delete(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email: email} });
    }
}
