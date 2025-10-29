import mongoose from "mongoose";

const statusFlagSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true, // ensures only one flag per student
    },
    status: {
      type: String,
      enum: ["not_submitted", "submitted", "approved", "rejected"],
      default: "not_submitted",
    },
    updatedBy: {
      type: String, // could be "student" or "admin"
    },
  },
  { timestamps: true }
);

const StatusFlag = mongoose.model("StatusFlag", statusFlagSchema);
export default StatusFlag;
