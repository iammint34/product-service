import { Body, Controller, Get, Post, Query, Param } from "@nestjs/common";
import { productService } from "./product.service";
import { Product, Filters } from "./dto";
import { v4 as uuidv4 } from 'uuid';

@Controller('product')
export class productController {
    constructor(private service: productService) { }

    @Get()
    async handleList(@Query() query: Filters) {
        return await this.service.getList(query);
    }

    @Get(':uuid')
    async handleGetByUuid(@Param() param: { uuid: string }) {
        return await this.service.getByUuid(param.uuid);
    }

    @Post()
    async handleCreateRecord(@Body() dto: Product) {
        dto.uuid = uuidv4(); // Set UUID
        dto.status = 'ACTIVE' // Set Status Active by Default
        return await this.service.createRecord(dto);
    }

}