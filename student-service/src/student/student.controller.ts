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
// import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { StudentService } from './student.service';
// import { Student as GrpcStudent, GetStudentRequest, DeleteResponse, StudentList } from 'proto/student'; // Generated interfaces

// @Controller('students')
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   @Post()
//   async create(@Body() student: GrpcStudent): Promise<GrpcStudent> {
//     return await this.studentService.create(student);
//   }

//   @Get()
//   async findAll(): Promise<StudentList> {
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



//performing one way encoding and decoding of protobufs
import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { StudentService } from './student.service';
import * as protobuf from 'protobufjs';

@Controller('students')
export class StudentController {
  private protobufRoot: protobuf.Root;
  private StudentList: protobuf.Type;
  private GrpcStudent: protobuf.Type;
  private DeleteResponse: protobuf.Type;

  constructor(private readonly studentService: StudentService) {
    this.loadProtobufDefinitions();
  }

  private async loadProtobufDefinitions() {
    this.protobufRoot = await protobuf.load("proto/student.proto"); // Adjust path if needed
    this.StudentList = this.protobufRoot.lookupType("student.StudentList");
    this.GrpcStudent = this.protobufRoot.lookupType("student.Student");
    this.DeleteResponse = this.protobufRoot.lookupType("student.DeleteResponse");
  }

  @Post()
  async create(@Body() student: any, @Res() res: Response) {
    const result = await this.studentService.create(student);
    return this.sendProtobufResponse(res, result, this.GrpcStudent);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.studentService.findAll({});
    return this.sendProtobufResponse(res, result, this.StudentList);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const student = await this.studentService.findOne({ id });
    return this.sendProtobufResponse(res, student, this.GrpcStudent);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.studentService.delete({ id });
    return this.sendProtobufResponse(res, result, this.DeleteResponse);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() student: any, @Res() res: Response) {
    const result = await this.studentService.update({ ...student, id });
    return this.sendProtobufResponse(res, result, this.GrpcStudent);
  }

  private sendProtobufResponse(res: Response, data: any, messageType: protobuf.Type) {
    if (!data) {
      return res.json({ error: 'Invalid Protobuf data' });
    }

    try {
      console.log(" Received Data:", JSON.stringify(data, null, 2));

      if (!messageType.create || !messageType.encode) {
        throw new Error('Invalid Protobuf message type (missing create/encode function)');
      }

      const protobufMessage = messageType.create(data);
      const encodedData = messageType.encode(protobufMessage).finish();

      return res.json({ data: Buffer.from(encodedData).toString('base64') });

    } catch (error) {
      console.error(" Protobuf Encoding Error:", error);
      return res.json({ error: 'Failed to encode Protobuf', details: error.message });
    }
  }
}






//To perform 2 way encoding and decoding (communication) of protobufs
//this is possible only with frontend integration since we need a readable format to send to the message
// import { Controller, Get, Post, Put, Delete, Param, Body, Res, OnModuleInit } from '@nestjs/common';
// import { Response } from 'express';
// import { StudentService } from './student.service';
// import * as protobuf from 'protobufjs';

// @Controller('students')
// export class StudentController implements OnModuleInit {
//   private protobufRoot: protobuf.Root;
//   private StudentList: protobuf.Type;
//   private GrpcStudent: protobuf.Type;
//   private DeleteResponse: protobuf.Type;

//   constructor(private readonly studentService: StudentService) {}

//   async onModuleInit() {
//     this.protobufRoot = await protobuf.load("proto/student.proto"); // Adjust path if needed
//     this.StudentList = this.protobufRoot.lookupType("student.StudentList");
//     this.GrpcStudent = this.protobufRoot.lookupType("student.Student");
//     this.DeleteResponse = this.protobufRoot.lookupType("student.DeleteResponse");
//   }

//   /**
//    * POST: Receives Base64-encoded Protobuf, decodes it, and creates a student.
//    */
//   @Post()
//   async create(@Body() encodedData: { data: string }, @Res() res: Response) {
//     try {
//       const decodedData = this.decodeProtobuf(encodedData.data, this.GrpcStudent);
//       console.log("decodedData",decodedData);
//       const result = await this.studentService.create(decodedData);
//       return this.sendProtobufResponse(res, result, this.GrpcStudent);
//     } catch (error) {
//       return res.status(400).json({ error: 'Invalid Protobuf data' });
//     }
//   }

//   /**
//    * GET: Fetch all students and return a Protobuf-encoded response.
//    */
//   @Get()
//   async findAll(@Res() res: Response) {
//     const result = await this.studentService.findAll({});
//     return this.sendProtobufResponse(res, result, this.StudentList);
//   }

//   /**
//    * GET: Fetch a single student by ID and return a Protobuf-encoded response.
//    */
//   @Get(':id')
//   async findOne(@Param('id') id: string, @Res() res: Response) {
//     const student = await this.studentService.findOne({ id });
//     return this.sendProtobufResponse(res, student, this.GrpcStudent);
//   }

//   /**
//    * DELETE: Deletes a student by ID and returns a Protobuf response.
//    */
//   @Delete(':id')
//   async delete(@Param('id') id: string, @Res() res: Response) {
//     const result = await this.studentService.delete({ id });
//     return this.sendProtobufResponse(res, result, this.DeleteResponse);
//   }

//   /**
//    * PUT: Receives Base64-encoded Protobuf, decodes it, updates a student, and returns a Protobuf response.
//    */
//   @Put(':id')
//   async update(@Param('id') id: string, @Body() encodedData: { data: string }, @Res() res: Response) {
//     try {
//       const decodedData = this.decodeProtobuf(encodedData.data, this.GrpcStudent);
//       const result = await this.studentService.update({ ...decodedData, id });
//       return this.sendProtobufResponse(res, result, this.GrpcStudent);
//     } catch (error) {
//       return res.status(400).json({ error: 'Invalid Protobuf data' });
//     }
//   }

//   /**
//    * Decodes a Base64-encoded Protobuf message into JSON.
//    */
//   private decodeProtobuf(base64Data: string, messageType: protobuf.Type): any {
//     try {
//       const buffer = Buffer.from(base64Data, 'base64'); // Convert Base64 to Buffer
//       return messageType.decode(buffer); // Decode Protobuf
//     } catch (error) {
//       throw new Error("Failed to decode Protobuf data: " + error.message);
//     }
//   }

//   /**
//    * Encodes JSON data into a Protobuf message and sends it as a Base64 response.
//    */
//   private sendProtobufResponse(res: Response, data: any, messageType: protobuf.Type) {
//     if (!data) {
//       return res.json({ error: 'Invalid Protobuf data' });
//     }

//     try {
//       const protobufMessage = messageType.create(data);
//       const encodedData = messageType.encode(protobufMessage).finish();

//       return res.json({ data: Buffer.from(encodedData).toString('base64') });

//     } catch (error) {
//       return res.json({ error: 'Failed to encode Protobuf', details: error.message });
//     }
//   }
// }
