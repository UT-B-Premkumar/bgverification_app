import mongoose, { Schema, Document, Model, models, model } from "mongoose";

// 1️⃣ Create an interface for TypeScript
export interface IUser extends Document {
  firstName: string;
  email: string;
  password: string;
  role: string;
}

// 2️⃣ Define schema
const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
});

// 3️⃣ Type the model properly
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
