import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/schema/student.schema';
import { Student as GrpcStudent, GetStudentRequest, DeleteResponse, StudentList, Empty } from 'proto/student';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

  async create(student: GrpcStudent): Promise<GrpcStudent> {
    const createdStudent = new this.studentModel(student);
    const savedStudent = await createdStudent.save();
    return this.toGrpcStudent(savedStudent);
  }

  async findAll(_: Empty): Promise<StudentList> {
    const students = await this.studentModel.find().exec();
    return { students: students.map(this.toGrpcStudent) };
  }

async findOne(request: GetStudentRequest): Promise<GrpcStudent> {
  console.log("Received ID:", request.id);

  // Validate ObjectId
  if (!Types.ObjectId.isValid(request.id)) {
    console.error(" Invalid ObjectId:", request.id);
    throw new RpcException('Invalid student ID format');
  }
 
  console.log(" Valid ObjectId:", request.id);

  // Query the database
  const student = await this.studentModel.findById(request.id).exec();

  // Handle case when student is not found
  if (!student) {
    console.warn("Student not found:", request.id);
    throw new RpcException('Student not found');
  }

  return this.toGrpcStudent(student);
}

    async update(student: GrpcStudent): Promise<GrpcStudent> {
        const updatedStudent = await this.studentModel.findByIdAndUpdate(student.id, student, { new: true }).exec();
        if (!updatedStudent) {
            throw new RpcException('Student not found');
        }
        return this.toGrpcStudent(updatedStudent);
    }


  async delete(request: GetStudentRequest): Promise<DeleteResponse> {
    const result = await this.studentModel.deleteOne({ _id: request.id }).exec();
    return { success: result.deletedCount > 0 };
  }

  private toGrpcStudent(student: Student): GrpcStudent {
    return {
      id: (student as any)._id.toString(), // Convert MongoDB _id to string
      name: student.name,
      age: student.age,
      email: student.email,
    };
  }
}
