import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('COOMUVEMAR BACKEND')
    .setDescription('Desarrollando API REST de los endpoint')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'COOMUVEMAR' });

  await app.listen(4000);
}
bootstrap();
