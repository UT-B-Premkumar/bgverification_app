import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import studentModel from "@/models/studentModel";

const JWT_SECRET = process.env.JWT_SECRET!;

export const createStudent = async (formData, req) => {
  // Verify token from cookie
  const token = req.cookies.get("token")?.value;

  if (!token) throw new Error("Unauthorized - Token missing");

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const name = formData.get("name");
  const email = formData.get("email");
  const aadhar = formData.get("aadhar");
  const pan = formData.get("pan");

  const pdfFields = ["tenthPdf", "twelfthPdf", "degreePdf"];
  const pdfPaths = {};

  for (const field of pdfFields) {
    const file = formData.get(field);
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);
      pdfPaths[field] = `/uploads/${file.name}`;
    }
  }

  const newStudent = await studentModel.create({
    userId: decoded.id, // link to logged-in user
    name,
    email,
    aadhar,
    pan,
    ...pdfPaths,
  });

  return newStudent;
};


export const getStudents = async () => {
  const students = await studentModel.find().sort({ createdAt: -1 });
  return students;
};