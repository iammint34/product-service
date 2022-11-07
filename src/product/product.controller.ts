import { Body, Controller, Get, Post, Query, Param, Patch, Delete } from "@nestjs/common";
import { productService } from "./product.service";
import { CreateProduct, UpdateProduct } from "./dto";
import { v4 as uuidv4 } from 'uuid';

@Controller('product')
export class productController {
    constructor(private service: productService) { }

    @Get()
    async handleList(@Query() query: {
        search?: string;
        code?: string;
        name?: string;
        page?: number;
        perPage?: number;
        status?: string;
        sort?: string;
        order?: string;
    }) {
        return await this.service.getList(query);
    }

    @Get(':uuid')
    async handleGetByUuid(@Param() param: { uuid: string }) {
        return await this.service.getByUuid(param.uuid);
    }

    @Patch('status/active')
    async handleUpdateStatusToActiveByBulk(@Body() payload: string[]) {
        return await this.service.updateStatusToActive(payload);
    }

    @Patch('status/inactive')
    async handleUpdateStatusToInactiveByBulk(@Body() payload: string[]) {
        return await this.service.updateStatusToInactive(payload);
    }

    @Patch(':uuid')
    async handleUpdateRecord(@Param() param: { uuid: string }, @Body() dto: UpdateProduct) {
        return await this.service.updateRecord(param.uuid, dto);
    }

    @Delete('')
    async handleDeleteByBulk(@Body() payload: string[]) {
        return await this.service.deleteRecordByBulk(payload);
    }

    @Post()
    async handleCreateRecord(@Body() dto: CreateProduct) {
        dto.uuid = uuidv4(); // Set UUID
        dto.status = 'ACTIVE' // Set Status Active by Default
        return await this.service.createRecord(dto);
    }

}