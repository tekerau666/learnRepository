import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(
            __dirname,
            '../../..',
            configService.get<string>('PRIVATE_PATH'),
          ),
          // serveRoot: '/personal',
        },
        {
          // rootPath: join(
          //   __dirname,
          //   '../../..',
          //   configService.get<string>('PUBLIC_PATH'),
          // ),
          // serveRoot: '/app',
        },
      ],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
