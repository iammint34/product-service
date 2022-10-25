import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        })
    }

    paginate(page?: number, limit?: number): { limit: number, offset: number } {
        const offset = (page > 1) ? ((page * limit) - limit) : 0
        return { limit: Number(limit), offset: offset }
    }

}
