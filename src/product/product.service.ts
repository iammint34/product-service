import { Injectable, ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Filters } from "./dto";

@Injectable({})
export class productService {
    constructor(private prisma: PrismaService) { }
    async getList(filters?: Filters) {
        try {
            const pagination = this.prisma.paginate(filters.page, filters.perPage)
            const search = filters.search;
            delete filters.page, delete filters.perPage, delete filters.search;
            return await this.prisma.product.findMany({
                skip: pagination.offset,
                take: pagination.limit,
                where: {
                    ...filters,
                    OR: [
                        { code: { contains: search } },
                        { name: { contains: search } }
                    ]
                }
            });
        } catch (error) {
            throw new ForbiddenException('Unable to get Products.');
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

}