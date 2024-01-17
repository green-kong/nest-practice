import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'user',
  password: 'password',
  database: 'auction',
  synchronize: true,
  entities: [__dirname + '/../../entity/src/**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV === 'test',
};
