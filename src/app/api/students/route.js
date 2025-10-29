import { NextResponse } from "next/server";
import { createStudent, getStudents } from "@/controllers/studentController";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const student = await createStudent(formData, req);
    return NextResponse.json({ success: true, student });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    const students = await getStudents();
    return NextResponse.json({ success: true, students });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
