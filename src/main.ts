import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //app.useGlobalPipes(new ValidationPipe());--> se comenta para que no se aplique la validacion de los datos

  //Aumentar el límite del tamaño de body permitido
 // Configurar el límite del cuerpo JSON
 app.use(bodyParser.json({ limit: '15mb' }));
 app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('COOMUVEMAR BACKEND')
    .setDescription('Desarrollando API REST de los endpoint')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'COOMUVEMAR' });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
