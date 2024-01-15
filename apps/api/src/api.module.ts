import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig)],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
