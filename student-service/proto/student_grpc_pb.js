// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var student_pb = require('./student_pb.js');

function serialize_student_DeleteResponse(arg) {
  if (!(arg instanceof student_pb.DeleteResponse)) {
    throw new Error('Expected argument of type student.DeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_student_DeleteResponse(buffer_arg) {
  return student_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_student_Empty(arg) {
  if (!(arg instanceof student_pb.Empty)) {
    throw new Error('Expected argument of type student.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_student_Empty(buffer_arg) {
  return student_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_student_GetStudentRequest(arg) {
  if (!(arg instanceof student_pb.GetStudentRequest)) {
    throw new Error('Expected argument of type student.GetStudentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_student_GetStudentRequest(buffer_arg) {
  return student_pb.GetStudentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_student_Student(arg) {
  if (!(arg instanceof student_pb.Student)) {
    throw new Error('Expected argument of type student.Student');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_student_Student(buffer_arg) {
  return student_pb.Student.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_student_StudentList(arg) {
  if (!(arg instanceof student_pb.StudentList)) {
    throw new Error('Expected argument of type student.StudentList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_student_StudentList(buffer_arg) {
  return student_pb.StudentList.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service definition
var StudentServiceService = exports.StudentServiceService = {
  createStudent: {
    path: '/student.StudentService/CreateStudent',
    requestStream: false,
    responseStream: false,
    requestType: student_pb.Student,
    responseType: student_pb.Student,
    requestSerialize: serialize_student_Student,
    requestDeserialize: deserialize_student_Student,
    responseSerialize: serialize_student_Student,
    responseDeserialize: deserialize_student_Student,
  },
  getStudentById: {
    path: '/student.StudentService/GetStudentById',
    requestStream: false,
    responseStream: false,
    requestType: student_pb.GetStudentRequest,
    responseType: student_pb.Student,
    requestSerialize: serialize_student_GetStudentRequest,
    requestDeserialize: deserialize_student_GetStudentRequest,
    responseSerialize: serialize_student_Student,
    responseDeserialize: deserialize_student_Student,
  },
  updateStudent: {
    path: '/student.StudentService/UpdateStudent',
    requestStream: false,
    responseStream: false,
    requestType: student_pb.Student,
    responseType: student_pb.Student,
    requestSerialize: serialize_student_Student,
    requestDeserialize: deserialize_student_Student,
    responseSerialize: serialize_student_Student,
    responseDeserialize: deserialize_student_Student,
  },
  deleteStudent: {
    path: '/student.StudentService/DeleteStudent',
    requestStream: false,
    responseStream: false,
    requestType: student_pb.GetStudentRequest,
    responseType: student_pb.DeleteResponse,
    requestSerialize: serialize_student_GetStudentRequest,
    requestDeserialize: deserialize_student_GetStudentRequest,
    responseSerialize: serialize_student_DeleteResponse,
    responseDeserialize: deserialize_student_DeleteResponse,
  },
  listStudents: {
    path: '/student.StudentService/ListStudents',
    requestStream: false,
    responseStream: false,
    requestType: student_pb.Empty,
    responseType: student_pb.StudentList,
    requestSerialize: serialize_student_Empty,
    requestDeserialize: deserialize_student_Empty,
    responseSerialize: serialize_student_StudentList,
    responseDeserialize: deserialize_student_StudentList,
  },
};

exports.StudentServiceClient = grpc.makeGenericClientConstructor(StudentServiceService, 'StudentService');
