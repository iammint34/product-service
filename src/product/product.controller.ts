import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { productService } from "./product.service";
import { Product } from "./dto";
import { v4 as uuidv4 } from 'uuid';

@Controller('product')
export class productController {
    constructor(private service: productService) { }

    @Get()
    handleList() {
        return this.service.getList()
    }

    @Post()
    async handleCreateRecord(@Body() dto: Product) {
        dto.uuid = uuidv4(); // Set UUID
        dto.status = 'ACTIVE' // Set Status Active by Default
        return await this.service.createRecord(dto);
    }
}