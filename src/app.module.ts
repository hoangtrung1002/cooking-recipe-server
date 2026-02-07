import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import sequelizeConfig from './config/sequelize.config';
import { StartTimeMiddleware } from './common/middlewares/start-time.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions =>
        sequelizeConfig(configService),
    }),
    UserModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StartTimeMiddleware)
      .forRoutes({ path: '{*wildcard}', method: RequestMethod.ALL });
  }
}
