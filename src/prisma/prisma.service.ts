import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
    }
    async onModuleInit() {
        console.log(`OPEN CONNECTION:`);
        await this.$connect()
    }
    
    async onModuleDestroy() {
        console.log(`CLOSE CONNECTION:`);
        await this.$disconnect()
    }


    paginate(page?: number, limit?: number): { limit: number, offset: number } {
        const offset = (page > 1) ? ((page * limit) - limit) : 0
        return { limit: Number(limit), offset: offset }
    }

}
