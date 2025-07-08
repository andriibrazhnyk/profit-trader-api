import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { appConfiguration } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get<ConfigType<typeof appConfiguration>>(
    appConfiguration.KEY,
  );

  setupSwagger(app);
  await app.listen(appConfig.port);
}
bootstrap();
