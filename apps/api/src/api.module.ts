import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TagModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
