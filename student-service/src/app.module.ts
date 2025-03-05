import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { StudentModule } from './student.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/grpc-studentdb'), // Replace with your MongoDB connection string
    StudentModule,
  ],
})
export class AppModule {}
