import { NextResponse } from "next/server";
import User from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (req: Request) => {
  const body = await req.json();
  const { firstName, email, password, confirmPassword } = body;

  if (!firstName || !email || !password || !confirmPassword)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  if (password !== confirmPassword)
    return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    email,
    password: hashedPassword,
    role:"student"
  });

  return NextResponse.json({ message: "User created" });
};

export const getUsers = async () => {
  const users = await User.find();
  return NextResponse.json(users);
};
