"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
 const [studentId, setStudentId] = useState<any>(null);


  // Fetch all student data from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students", { method: "GET" });

        const data = await res.json();
        // console.log(data);
        setStudents(data?.students);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };

    fetchStudents();
  }, []);


  const approveHandler = async () => {
  try {
    const res = await fetch(`/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve", updatedBy: "admin" }),
    });

    if (!res.ok) {
      toast.error("Failed to approve documents");
      return;
    }

    const data = await res.json();
    if (data.status === "approved") {
      toast.success("Documents Approved");
      setIsOpen(false);
    } else {
      toast.error("Something went wrong while approving");
    }
  } catch (error) {
    console.error("Error approving:", error);
    toast.error("Network or server error");
  }
};


const rejectHandler = async () => {
  try {
    const res = await fetch(`/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject", updatedBy: "admin" }),
    });

    if (!res.ok) {
      toast.error("Failed to reject documents");
      return;
    }

    const data = await res.json();
    if (data.status === "rejected") {
      toast.error("Documents Rejected");
    } else {
      toast.error("Something went wrong while rejecting");
    }
  } catch (error) {
    console.error("Error rejecting:", error);
    toast.error("Network or server error");
  }
};


  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Student List</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 text-sm font-medium text-gray-600">Name</th>
                <th className="p-3 text-sm font-medium text-gray-600">Email</th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Aadhaar
                </th>
                <th className="p-3 text-sm font-medium text-gray-600">PAN</th>
                {/* <th className="p-3 text-sm font-medium text-gray-600">10th</th>
                <th className="p-3 text-sm font-medium text-gray-600">12th</th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Degree
                </th> */}
                <th className="p-3 text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{student.name}</td>
                    <td className="p-3 text-gray-700">{student.email}</td>
                    <td className="p-3 text-gray-700">{student.aadhar}</td>
                    <td className="p-3 text-gray-700">{student.pan}</td>
                    {/* <td className="p-3">
                      {student.tenthPdf ? (
                        <a
                          href={student.tenthPdf}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-3">
                      {student.twelfthPdf ? (
                        <a
                          href={student.twelfthPdf}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-3">
                      {student.degreePdf ? (
                        <a
                          href={student.degreePdf}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td> */}
                    <td className="p-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setSelected(student);
                          setIsOpen(true);
                          setStudentId(student?.userId)
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Student Details</h3>
            <div className="space-y-2">
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <p>
                  <b>Name:</b> {selected.name}
                </p>
                <p>
                  <b>Email:</b> {selected.email}
                </p>
                <p>
                  <b>Aadhaar:</b> {selected.aadhar}
                </p>
                <p>
                  <b>PAN:</b> {selected.pan}
                </p>

                {/* PDF Previews */}
                {selected.tenthPdf && (
                  <div>
                    <p>
                      <b>10th PDF:</b>
                    </p>
                    <iframe
                      src={selected.tenthPdf}
                      width="100%"
                      height="300px"
                      className="border rounded"
                    />
                  </div>
                )}

                {selected.twelfthPdf && (
                  <div>
                    <p>
                      <b>12th PDF:</b>
                    </p>
                    <iframe
                      src={selected.twelfthPdf}
                      width="100%"
                      height="300px"
                      className="border rounded"
                    />
                  </div>
                )}

                {selected.degreePdf && (
                  <div>
                    <p>
                      <b>Degree PDF:</b>
                    </p>
                    <iframe
                      src={selected.degreePdf}
                      width="100%"
                      height="300px"
                      className="border rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 flex gap-2 justify-center">
              <button className="bg-red-500 rounded px-3 text-white py-2 cursor-pointer" onClick={rejectHandler}>Reject</button>
              <button className="bg-green-500 rounded px-2 text-white py-2 cursor-pointer" onClick={approveHandler}>Approve</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
