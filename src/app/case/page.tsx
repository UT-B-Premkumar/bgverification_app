"use client";

import { useState } from "react";
import Layout from "../components/Layout";
import { Eye } from "lucide-react";

export default function Cases() {
  // Example cases data
   const [isOpen, setIsOpen] = useState(false);
  const cases = [
    {
      id: 1,
      name: "Ravi Kumar",
      aadhaar: "1234-5678-9012",
      reason: "Theft",
      punishment: "2 years",
      status: "Pending",
    },
    {
      id: 2,
      name: "Suresh Singh",
      aadhaar: "9876-5432-1098",
      reason: "Fraud",
      punishment: "5 years",
      status: "Closed",
    },
    {
      id: 3,
      name: "Amit Sharma",
      aadhaar: "1111-2222-3333",
      reason: "Smuggling",
      punishment: "10 years",
      status: "Pending",
    },
  ];

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Cases</h2>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Cases List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 text-sm font-medium text-gray-600">Name</th>
                <th className="p-3 text-sm font-medium text-gray-600">Aadhaar Card</th>
                <th className="p-3 text-sm font-medium text-gray-600">Reason</th>
                <th className="p-3 text-sm font-medium text-gray-600">Punishment</th>
                <th className="p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="p-3 text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-700">{c.name}</td>
                  <td className="p-3 text-gray-700">{c.aadhaar}</td>
                  <td className="p-3 text-gray-700">{c.reason}</td>
                  <td className="p-3 text-gray-700">{c.punishment}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-5 w-5"    onClick={() => setIsOpen(true)}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </Layout>
  );
}
