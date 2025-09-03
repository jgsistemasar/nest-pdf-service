import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false,
    transformOptions: { enableImplicitConversion: true },
  }));

  const config = new DocumentBuilder()
    .setTitle('PDF Service')
    .setDescription('API para autenticación y generación de PDFs')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 7172;
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
  console.log(`📚 Swagger on http://localhost:${port}/docs`);
}
bootstrap();