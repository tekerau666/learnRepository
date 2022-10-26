import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.useStaticAssets('static/');
  app.useStaticAssets(
    join(__dirname, '../../..', configService.get('PRIVATE_PATH')),
    { index: false },
  );
  app.setViewEngine('pug');
  const port = +configService.get('PORT');
  const swagger = +configService.get('SWAGGER');
  if (swagger) {
    const config = new DocumentBuilder()
      .setTitle('Удалтон API')
      .setDescription('Внутренний API движка платформы')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const options: SwaggerDocumentOptions = {
      include: [
        // AppModule,
      ],
    };
    const setupOptions = {
      customSiteTitle: 'API docs',
    };
    if (configService.get<string>('SWAGGER') === '1') {
      const document = SwaggerModule.createDocument(app, config, options);
      SwaggerModule.setup('api/v1', app, document, setupOptions);
    }
  }
  await app.listen(port);
}
bootstrap();
