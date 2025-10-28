import { NextRequest, NextResponse } from "next/server";
import { getAllCases, createCase, updateCase } from "@/controllers/disciplinaryController";
import { connectDB } from "@/lib/mongodb";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const cases = await getAllCases(req);
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req:NextRequest) => {
  try {
    await connectDB();
    console.log("req", req);
    
    const data = await req.json();
    const newCase = await createCase(req,data);
    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};




