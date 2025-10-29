import { connectDB } from "@/lib/mongodb";
import StatusFlag from "@/models/statusFlag";

export async function PUT(request, { params }) {
  await connectDB();

  const { id } = params;
  const { action, updatedBy } = await request.json();

  const validActions = ["submit", "approve", "reject"];
  if (!validActions.includes(action)) {
    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
    });
  }

  let newStatus = "not_submitted";
  if (action === "submit") newStatus = "submitted";
  else if (action === "approve") newStatus = "approved";
  else if (action === "reject") newStatus = "rejected";

  const updatedFlag = await StatusFlag.findOneAndUpdate(
    { studentId: id },
    { status: newStatus, updatedBy },
    { new: true, upsert: true }
  );

  return new Response(JSON.stringify(updatedFlag), { status: 200 });
}

export async function GET(request, { params }) {
  await connectDB();

  const { id } = params;

  console.log("id" , params);
  

  const flag = await StatusFlag.findOne({ studentId: id });

  if (!flag) {
    return new Response(
      JSON.stringify({ status: "not_submitted", message: "No status found" }),
      { status: 200 }
    );
  }

  return new Response(JSON.stringify(flag), { status: 200 });
}
