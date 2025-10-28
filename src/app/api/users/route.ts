import { NextRequest } from "next/server";
import { createUser, getUsers } from "@/controllers/userController";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await connectDB();
  return createUser(req);
}

export async function GET(req: NextRequest) {
  await connectDB();
  return getUsers();
}
