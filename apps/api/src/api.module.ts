import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { TagModule } from './tag/tag.module';
import { ProductModule } from './product/product.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TagModule, ProductModule, BidModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
