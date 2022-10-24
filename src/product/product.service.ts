import { Injectable, ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Product } from "./dto";

@Injectable({})
export class productService {
    constructor(private prisma: PrismaService) { }
    getList(filters?: {}) {
        return `Welcome to IMS product Module`
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