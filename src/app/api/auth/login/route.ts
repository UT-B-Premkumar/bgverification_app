import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { loginUser } from "@/controllers/authController";

export async function POST(req: NextRequest) {
  await connectDB();
  return loginUser(req);
}
