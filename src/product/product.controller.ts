import { Controller, Get, Req, Res } from "@nestjs/common";
import { productService } from "./product.service";
import { FastifyRequest, FastifyReply } from 'fastify'
import { globalService } from 'src/global/global.service';

@Controller('product')
export class productController {
    constructor(private service: productService) { }

    @Get()
    handleList(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
        response.code(200).send(this.service.getList())
    }
}