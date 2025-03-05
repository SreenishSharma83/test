//simple grpc service controller for student 
// import { Controller } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';
// import { StudentService } from './student.service';
// import { Student as GrpcStudent, GetStudentRequest, DeleteResponse, StudentList, Empty } from 'proto/student';

// @Controller()
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   @GrpcMethod('StudentService', 'CreateStudent')
//   async create(student: GrpcStudent): Promise<GrpcStudent> {
//     return await this.studentService.create(student);
//   }

//   @GrpcMethod('StudentService', 'ListStudents')
//   async findAll(_: Empty): Promise<StudentList> {
//     return await this.studentService.findAll(_);
//   }

//   @GrpcMethod('StudentService', 'GetStudentById')
//   async findOne(request: GetStudentRequest): Promise<GrpcStudent | null> {
//     // console.log(request);
//     const student =  await this.studentService.findOne(request);
//     if(!student){
//       return null;
//     }       
//     console.log(student);
//     return student;
//   }

//   @GrpcMethod('StudentService', 'DeleteStudent')
//   async delete(request: GetStudentRequest): Promise<DeleteResponse> {
//     return await this.studentService.delete(request);
//   }

//   @GrpcMethod('StudentService', 'UpdateStudent')
//   async update(student: GrpcStudent): Promise<GrpcStudent> {
//     return await this.studentService.update(student);
//   }
// }





//Rest communication with protobufs in json format 
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student as GrpcStudent, GetStudentRequest, DeleteResponse, StudentList } from 'proto/student'; // Generated interfaces

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() student: GrpcStudent): Promise<GrpcStudent> {
    return await this.studentService.create(student);
  }

  @Get()
  async findAll(): Promise<StudentList> {
    return await this.studentService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GrpcStudent | null> {
    const request: GetStudentRequest = { id };
    const student = await this.studentService.findOne(request);
    return student || null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResponse> {
    const request: GetStudentRequest = { id };
    return await this.studentService.delete(request);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() student: GrpcStudent): Promise<GrpcStudent> {
    return await this.studentService.update({ ...student, id });
  }
}

















//***For rest communication with protobufs decoding from frontend***
// import { Controller, Get, Post, Put, Delete, Param, Body, Res, Header } from '@nestjs/common';
// import { Response } from 'express';
// import { StudentService } from './student.service';
// import { Student as GrpcStudent, GetStudentRequest, DeleteResponse, StudentList } from 'proto/student'; // Generated Protobuf interfaces

// @Controller('students')
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   @Post()
//   async create(@Body() student: GrpcStudent, @Res() res: Response) {
//     const result = await this.studentService.create(student);
//     return this.sendProtobufResponse(res, result);
//   }

//   @Get()
//   async findAll(@Res() res: Response) {
//     const result = await this.studentService.findAll({});
//     return this.sendProtobufResponse(res, result);
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string, @Res() res: Response) {
//     const request: GetStudentRequest = { id };
//     const student = await this.studentService.findOne(request);
//     return this.sendProtobufResponse(res, student || {});
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string, @Res() res: Response) {
//     const request: GetStudentRequest = { id };
//     const result = await this.studentService.delete(request);
//     return this.sendProtobufResponse(res, result);
//   }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() student: GrpcStudent, @Res() res: Response) {
//     const result = await this.studentService.update({ ...student, id });
//     return this.sendProtobufResponse(res, result);
//   }

//   // Helper function to serialize Protobuf response
//   private sendProtobufResponse(res: Response, data: any) {
//     const serializedData = (data as any).constructor.encode(data).finish(); // Protobuf serialization
//     res.setHeader('Content-Type', 'application/x-protobuf');
//     return res.send(Buffer.from(serializedData));
//   }
// }
