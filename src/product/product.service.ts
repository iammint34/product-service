import { Injectable, ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Filters } from "./dto";

@Injectable({})
export class productService {
    constructor(private prisma: PrismaService) {
        prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
            console.log('Query: ' + event.query)
            console.log('Params: ' + event.params)
            console.log('Duration: ' + event.duration + 'ms')
        });
    }
    async getList(filters?: Filters) {
        try {
            const pagination = this.prisma.paginate(filters.page, filters.perPage)
            const search = filters.search !== undefined ? {
                OR: [
                    { code: { contains: filters.search } },
                    { name: { contains: filters.search } }
                ]
            } : {};

            let sort = {}
            sort[filters.sort !== undefined ? filters.sort : 'id'] = filters.order !== undefined ? filters.order : 'desc';

            // remove unnecessary product filters
            delete filters.page, delete filters.perPage, delete filters.search, delete filters.sort, delete filters.order;

            return await this.prisma.product.findMany({
                skip: pagination.offset,
                take: pagination.limit,
                where: {
                    ...filters,
                    ...search
                },
                orderBy: [sort]
            });
        } catch (error) {
            throw new ForbiddenException('Unable to get Products.');
        }
    }

    async getByUuid(uuid: string) {
        try {
            return await this.prisma.product.findUnique({
                where: { uuid: uuid }
            })
        } catch (error) {
            console.log(error)
            throw new ForbiddenException('Unable to get Product.');
        }
    }

    async updateStatusToActive(payload: string[]) {
        try {
            return await this.prisma.product.updateMany({
                where: {
                    uuid: { in: payload }
                },
                data: {
                    status: 'ACTIVE'
                }
            })
        } catch (error) {
            throw new ForbiddenException('Unable to update Product Status.');
        }
    }

    async updateStatusToInactive(payload: string[]) {
        try {
            return await this.prisma.product.updateMany({
                where: {
                    uuid: { in: payload }
                },
                data: {
                    status: 'INACTIVE'
                }
            })
        } catch (error) {
            throw new ForbiddenException('Unable to update Product Status.');
        }
    }

    async deleteRecordByBulk(payload: string[]) {
        try {
            return await this.prisma.product.deleteMany({
                where: {
                    uuid: { in: payload }
                }
            })
        } catch (error) {
            throw new ForbiddenException('Unable to update Product Status.');
        }
    }


    async createRecord(data: Prisma.ProductCreateInput) {
        try {
            return await this.prisma.product.create({
                data
            })
        } catch (error) {
            throw new ForbiddenException('Product is already existing.');
        }
    }

    async updateRecord(uuid: string, data: Prisma.ProductCreateInput) {
        try {
            return await this.prisma.product.update({
                where: {
                    uuid: uuid
                },
                data
            })
        } catch (error) {
            throw new ForbiddenException('Product is already existing.');
        }
    }

}