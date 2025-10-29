"use client";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { MdAutorenew } from "react-icons/md";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewCaseForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [verifyText, setVerifyText] = useState("");
  const [statusBtn, setStatusBtn] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [submitedStatus, setSubmitedStatus] = useState("");
  interface NewCaseFormValues {
    name: string;
    email: string;
    aadhaar: string;
    pan: string;
    marks10: FileList;
    marks12: FileList;
    college: FileList;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewCaseFormValues>();

  async function getStudentFlag(studentId) {
    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: "GET",
        cache: "no-store", // prevents caching, ensures fresh data
      });

      if (!res.ok) {
        console.error("Failed to fetch student flag:", res.statusText);
        return null;
      }

      const data = await res.json();
      setSubmitedStatus(data.status);
      return data.status;
    } catch (error) {
      console.error("Error fetching student flag:", error);
      return null;
    }
  }

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setStudentId(id);
  }, []);

  useEffect(() => {
    if (studentId) getStudentFlag(studentId);
  }, [studentId]);
  useEffect(() => {
    getStudentFlag(studentId);
  }, [studentId]);

  const route = useRouter();

  // ✅ Actual submit logic
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Build FormData to send files + text
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("aadhar", data.aadhaar);
      formData.append("pan", data.pan);
      formData.append("tenthPdf", data.marks10[0]);
      formData.append("twelfthPdf", data.marks12[0]);
      formData.append("degreePdf", data.college[0]);

      const res = await fetch("/api/students", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");

      const result = await res.json();
      // console.log("✅ Form submitted successfully:", result);

      toast.success("Form submitted successfully!");
      const verificationResponse = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", updatedBy: "student" }),
      });

      if (!verificationResponse.ok) {
        console.error(
          "Failed to update status:",
          verificationResponse.statusText
        );
      } else {
        const data = await verificationResponse.json();
        setSubmitedStatus(data.status);
      }

      reset();
      route.refresh(); // refresh list if you have one
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {submitedStatus === "" ? (
        <div className="h-[400px] flex justify-center items-middle">
          <Loader />
        </div>
      ) : submitedStatus != "" && submitedStatus != "not_submitted" ? (
        <div className="flex flex-col gap-2 items-center">
          {submitedStatus === "approved" && (
            <img
              src="https://i.pinimg.com/originals/4a/10/e3/4a10e39ee8325a06daf00881ac321b2f.gif"
              alt=""
              width={200}
            />
          )}
          {submitedStatus === "rejected" && (
            <img
              src="https://i.pinimg.com/1200x/6f/ac/48/6fac48634563fee88e81de6b7a156cbb.jpg"
              alt=""
              width={200}
            />
          )}

          {submitedStatus === "submitted" && (
            <img
              src="https://i.pinimg.com/originals/92/7d/ca/927dcac449304f8164a6a0c423e9c100.gif"
              alt=""
              width={200}
            />
          )}
          <p className="text-center">
            Your verification proccess {submitedStatus}
          </p>
        </div>
      ) : (
        <div className="w-full h-[100vh]">
          <div className="flex gap-2 mb-3">
            <button
              className="bg-gray-500 rounded px-2 py-2 text-white cursor-pointer"
              onClick={() => setStatusBtn("manual")}
            >
              Manual
            </button>
            <button
              className="bg-gray-500 rounded px-2 py-2 cursor-pointer"
              onClick={() =>
                window.open("https://www.digilocker.gov.in/")
              }
            >
              DigiLocker
            </button>
          </div>

          {statusBtn === "manual" && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 rounded-xl shadow-md max-w-4xl space-y-6 h-fit"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Aadhaar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Aadhaar Card
                  </label>
                  <input
                    maxLength={12}
                    type="text"
                    {...register("aadhaar", {
                      required: "Aadhaar is required",
                      pattern: {
                        value: /^[0-9]{12}$/,
                        message: "Enter 12-digit Aadhaar",
                      },
                    })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                    placeholder="123456789012"
                  />
                  {errors.aadhaar && (
                    <p className="text-red-500 text-sm">
                      {errors.aadhaar.message}
                    </p>
                  )}
                </div>

                {/* PAN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PAN Card
                  </label>
                  <input
                    type="text"
                    {...register("pan", {
                      required: "PAN is required",
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: "Invalid PAN format",
                      },
                    })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 uppercase focus:ring focus:ring-blue-200 outline-none"
                    placeholder="ABCDE1234F"
                  />
                  {errors.pan && (
                    <p className="text-red-500 text-sm">
                      {errors.pan.message + " ABCDE1234F"}
                    </p>
                  )}
                </div>

                {/* 10th Marksheet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    10th Marksheet
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    {...register("marks10", {
                      required: "10th marksheet is required",
                    })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  />
                  {errors.marks10 && (
                    <p className="text-red-500 text-sm">
                      {errors.marks10.message}
                    </p>
                  )}
                </div>

                {/* 12th Marksheet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    12th Marksheet
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    {...register("marks12", {
                      required: "12th marksheet is required",
                    })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  />
                  {errors.marks12 && (
                    <p className="text-red-500 text-sm">
                      {errors.marks12.message}
                    </p>
                  )}
                </div>

                {/* College Certificate */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    College Certificate (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    {...register("college", {
                      required: "College certificate is required",
                    })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  />
                  {errors.college && (
                    <p className="text-red-500 text-sm">
                      {errors?.college.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      )}
    </Layout>
  );
}
