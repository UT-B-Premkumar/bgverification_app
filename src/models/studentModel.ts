// models/Student.ts
import mongoose, { Document, Model, model, models, Schema } from "mongoose";
import { IUser } from "./User"; // import your User interface if needed

// 1️⃣ Define the interface
export interface IStudent extends Document {
  userId: mongoose.Schema.Types.ObjectId | IUser;
  name: string;
  email: string;
  aadhar: string;
  pan: string;
  tenthPdf?: string;
  twelfthPdf?: string;
  degreePdf?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Define schema
const studentSchema = new Schema<IStudent>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    aadhar: { type: String, required: true },
    pan: { type: String, required: true },
    tenthPdf: { type: String },
    twelfthPdf: { type: String },
    degreePdf: { type: String },
  },
  { timestamps: true }
);

// 3️⃣ Create typed model
const Student: Model<IStudent> = models.Student || model<IStudent>("Student", studentSchema);

export default Student;
