// import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//     transport: Transport.GRPC,
//     options: {
//       package: 'student',
//       protoPath: 'proto/student.proto',
//       url : 'localhost:50055',
//     },
//   });

//   await app.listen();
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set limits and allow parsing of Protobuf binary data
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  await app.listen(3000);
}
bootstrap();
