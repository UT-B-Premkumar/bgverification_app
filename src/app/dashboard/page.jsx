"use client";

import { useState } from "react";
import Layout from "../components/Layout";
import { Eye } from "lucide-react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  // Example employee data
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      work: "Developer",
      experience: "3 yrs",
      aadhaar: "1234-5678-9012",
      pan: "ABCDE1234F",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      work: "Designer",
      experience: "5 yrs",
      aadhaar: "9876-5432-1098",
      pan: "PQRSX5678Y",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@example.com",
      work: "Manager",
      experience: "8 yrs",
      aadhaar: "1111-2222-3333",
      pan: "LMNOP3456Z",
    },
  ];

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Cards */}

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Employee List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 text-sm font-medium text-gray-600">Name</th>
                <th className="p-3 text-sm font-medium text-gray-600">Email</th>
                <th className="p-3 text-sm font-medium text-gray-600">Work</th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Experience
                </th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Aadhaar Card
                </th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  PAN Card
                </th>
                <th className="p-3 text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-700">{emp.name}</td>
                  <td className="p-3 text-gray-700">{emp.email}</td>
                  <td className="p-3 text-gray-700">{emp.work}</td>
                  <td className="p-3 text-gray-700">{emp.experience}</td>
                  <td className="p-3 text-gray-700">{emp.aadhaar}</td>
                  <td className="p-3 text-gray-700">{emp.pan}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye
                        className="h-5 w-5"
                        onClick={() => setIsOpen(true)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Modal Content */}
            {/* <h2 className="text-xl font-bold mb-4">Modal Title</h2> */}
            <div className="flex flex-wrap gap-4 my-3">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2"
                  value={"Prem"}
                  disabled
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2"
                  value={"prem@gmail.com"}
                  disabled
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">Role</label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2"
                  value={"Dev"}
                  disabled
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2"
                  value={"5 years"}
                  disabled
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2"
                  value={"123456789321"}
                  disabled
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">PAN</label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2"
                  value={"ABCDE1234F"}
                  disabled
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-600 text-sm mb-1">
                  Status
                </label>
                <input
                  type="text"
                  className="w-full border rounded border-gray-400 p-2 text-red-500"
                  value={"Pending"}
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-red-600 rounded mr-2 hover:bg-red-600 text-white cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Reject
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
