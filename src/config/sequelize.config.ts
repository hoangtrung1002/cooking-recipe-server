import models from '@/models';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

function sequelizeConfig(configService: ConfigService): SequelizeModuleOptions {
  return {
    dialect: configService.get<Dialect>('DB_DIALECT'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT')
      ? Number(configService.get<number>('DB_PORT'))
      : 5000,
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: true,
    autoLoadModels: true,
    logging: false,
    models: models,
  };
}
export default sequelizeConfig;
