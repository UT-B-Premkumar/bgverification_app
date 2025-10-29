// models/Disciplinary.ts
import mongoose, { Document, Model, model, models, Schema } from "mongoose";

// 1️⃣ Interface for TypeScript
export interface IDisciplinary extends Document {
  name: string;
  aadhaarCard: string;
  reason: string;
  punishment: string;
  status: "Pending" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Define schema
const DisciplinarySchema = new Schema<IDisciplinary>(
  {
    name: { type: String, required: true },
    aadhaarCard: { type: String, required: true, unique: true },
    reason: { type: String, required: true },
    punishment: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// 3️⃣ Type the model properly
const Disciplinary: Model<IDisciplinary> =
  models.Disciplinary || model<IDisciplinary>("Disciplinary", DisciplinarySchema);

export default Disciplinary;
