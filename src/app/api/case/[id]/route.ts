import { NextRequest, NextResponse } from "next/server";
import { getAllCases, createCase, updateCase, deleteCase } from "@/controllers/disciplinaryController";
import { connectDB } from "@/lib/mongodb";


export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    console.log("sf");
    
    await connectDB();
    const data = await req.json();

    console.log("📝 Updating Case ID:", params.id);
    console.log("🧩 Data:", data);

    const updated = await updateCase(req, params.id, data);
    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("❌ Update Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const deleted = await deleteCase(req, params.id);
    if (!deleted) return NextResponse.json({ message: "Case not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};