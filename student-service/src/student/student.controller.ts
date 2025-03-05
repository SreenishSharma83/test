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

//simple rest service controller for student 
// import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { StudentService } from './student.service';
// import { Student as GrpcStudent, GetStudentRequest, DeleteResponse, StudentList } from 'proto/student';

// @Controller('students')
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   @Post()
//   async create(@Body() student: GrpcStudent): Promise<GrpcStudent> {
//     return await this.studentService.create(student);
//   }

//   @Get()
//   async findAll(): Promise<StudentList> {
//     console.log('Find all students');
//     return await this.studentService.findAll({});
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<GrpcStudent | null> {
//     const request: GetStudentRequest = { id };
//     const student = await this.studentService.findOne(request);
//     return student || null;
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string): Promise<DeleteResponse> {
//     const request: GetStudentRequest = { id };
//     return await this.studentService.delete(request);
//   }

//   @Put(':id')
//   async update(@Param('id') id: string, @Body() student: GrpcStudent): Promise<GrpcStudent> {
//     return await this.studentService.update({ ...student, id });
//   }

// }

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