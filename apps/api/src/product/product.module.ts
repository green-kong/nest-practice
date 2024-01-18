import { Module } from '@nestjs/common';
import { ProductService } from './application/product.service';

@Module({
  providers: [ProductService]
})
export class ProductModule {}
