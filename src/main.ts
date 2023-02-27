import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: `${process.env.HOST}`,
      port: parseInt(process.env.REDIS_PORT),
    },
  });

  await app.startAllMicroservices();
  await app.listen(parseInt(process.env.PORT) || 8000, process.env.HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
