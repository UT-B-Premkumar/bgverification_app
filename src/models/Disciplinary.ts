// models/Disciplinary.js
import mongoose from "mongoose";

const DisciplinarySchema = new mongoose.Schema(
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

export default mongoose.models.Disciplinary || mongoose.model("Disciplinary", DisciplinarySchema);
