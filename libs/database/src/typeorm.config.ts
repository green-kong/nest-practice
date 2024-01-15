import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'user',
  password: 'password',
  database: 'auction',
  synchronize: true,
};
