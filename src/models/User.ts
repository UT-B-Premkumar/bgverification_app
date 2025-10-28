import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" }, // 👈 Default role set
});

const User = models.User || mongoose.model("User", UserSchema);
export default User;
