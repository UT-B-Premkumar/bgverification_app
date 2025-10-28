import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    documents: {
      aadhaarCard: String,
      panCard: String,
      mark10: String,
      mark12: String,
      collegeCert: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model("Student", studentSchema);
