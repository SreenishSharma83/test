import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Student extends Document{
    @Prop()
    name : string;
    @Prop()
    age : number;
    @Prop()
    email : string;
}
//convert the class to mongodb schema
export const StudentSchema =  SchemaFactory.createForClass(Student);

// Student & Document → This creates a new type that includes:
// All fields from Student (like name, age, email).
// All methods from Document (like .save(), .remove(), etc.).