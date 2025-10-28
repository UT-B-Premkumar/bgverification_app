import Disciplinary from "@/models/Disciplinary";
import { verifyToken } from "@/lib/auth";


// Helper to extract token from request headers
const getTokenFromReq = (req) => {
  
  //  console.log(req);
   
  const authHeader = req.headers.get("authorization");
    
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token missing");
  }
  return authHeader.split(" ")[1];
};

// Get all disciplinary cases
export const getAllCases = async (req) => {
  try {
    const token = getTokenFromReq(req);
    verifyToken(token);

    const cases = await Disciplinary.find({});

    if (!cases || cases.length === 0) {
      // Return an empty array with a message
      return { message: "No disciplinary cases found", data: [] };
    }

    return { message: "Disciplinary cases fetched successfully", data: cases };
  } catch (error) {
    // Proper error response
    return { message: error.message, data: [] };
  }
};


// Get a single case by ID
export const getCaseById = async (req, id) => {
  const token = getTokenFromReq(req);
  verifyToken(token);

  return await Disciplinary.findById(id);
};

// Create a new disciplinary case
export const createCase = async (req, data) => {
  const token = getTokenFromReq(req);
  verifyToken(token);

  const { name, aadhaarCard, reason, punishment, status } = data;
  if (!name || !aadhaarCard || !reason || !punishment) {
    throw new Error("Missing required fields");
  }

  return await Disciplinary.create({
    name,
    aadhaarCard,
    reason,
    punishment,
    status: status || "Pending",
  });
};

// Update a case by ID
export const updateCase = async (req: Request, id: string, data: any) => {


  // 🔐 Verify JWT
  const token = getTokenFromReq(req);
  verifyToken(token);

  // 🧾 Validate input
  if (!id) throw new Error("Missing case ID");

  const { name, aadhaarCard, reason, punishment, status } = data;

  // 🔄 Update case
  const updatedCase = await Disciplinary.findByIdAndUpdate(
    id,
    { name, aadhaarCard, reason, punishment, status },
    { new: true, runValidators: true }
  );

  if (!updatedCase) throw new Error("Case not found");

  return updatedCase;
};

// Delete a case by ID
export const deleteCase = async (req, id) => {
  const token = getTokenFromReq(req);
  verifyToken(token);

  const deletedCase = await Disciplinary.findByIdAndDelete(id);
  if (!deletedCase) throw new Error("Case not found");
  return deletedCase;
};
