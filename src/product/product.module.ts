import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { productService } from './product.service';


@Module({
    controllers: [productController],
    providers: [productService]
})
export class productModule {}