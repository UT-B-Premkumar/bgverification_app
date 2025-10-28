"use client";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { MdAutorenew } from "react-icons/md";
import { useState } from "react";
import Loader from "../components/Loader/Loader";
import { useRouter } from "next/navigation";

export default function NewCaseForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [verifyText, setVerifyText] = useState("");
  const [statusBtn, setStatusBtn] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const route = useRouter()
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <Layout>
      {/* <h2 className="text-2xl font-bold mb-6">Add New Case</h2> */}
      <div className="w-full h-[100vh]  ">
    <div className="flex gap-2 mb-3">

    <button className="bg-gray-500 rounded px-2 py-2 text-white cursor-pointer" onClick={()=>setStatusBtn("manual")}>Manual</button>
    <button className="bg-gray-500  rounded px-2 py-2 cursor-pointer" onClick={() => window.open("https://www.digilocker.gov.in/", "_blank")}>DigiLoacker</button>
    </div>
      {
        statusBtn === "manual" && 
         <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-xl shadow-md max-w-4xl space-y-6 h-fit"
        >
          {/* Grid container */}
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
                <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Aadhaar */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aadhaar Card
              </label>{" "}
              <div className="flex items-end gap-1.5">
                {" "}
                <input
                  type="text"
                  {...register("aadhaar", {
                    required: "Aadhaar is required",
                    pattern: {
                      value: /^[0-9]{12}$/,
                      message: "Enter 12-digit Aadhaar",
                    },
                  })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="1234-5678-9012"
                />
                {/* <button
                  className="text-black bg-blue-400 mt-2 rounded px-2 h-[41px] w-[41px] flex items-center justify-center text-white cursor-pointer d-none"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setVerifyText("Aadhaar");
                  }}
                >
                  <MdAutorenew className="h-full" />
                </button> */}
              </div>
              {errors.aadhaar && (
                <p className="text-red-500 text-sm">{errors.aadhaar.message}</p>
              )}
            </div>

            {/* PAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PAN Card
              </label>
              <div className="flex items-end gap-1.5">
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
                {/* <button
                  className="text-black bg-blue-400 mt-2 rounded px-2 h-[41px] w-[41px] flex items-center justify-center text-white cursor-pointer"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setVerifyText("PAN");
                  }}
                >
                  <MdAutorenew className="h-full" />
                </button> */}
              </div>
              {errors.pan && (
                <p className="text-red-500 text-sm">{errors.pan.message}</p>
              )}
            </div>

            {/* 10th Marksheet */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                10th Marksheet
              </label>
              <div className="flex items-end gap-1.5">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  {...register("marks10", {
                    required: "10th marksheet is required",
                  })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                />

                {/* <button
                  className="text-black bg-blue-400 mt-2 rounded px-2 h-[41px] w-[41px] flex items-center justify-center text-white cursor-pointer"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setVerifyText("SSLC");
                  }}
                >
                  <MdAutorenew className="h-full" />
                </button> */}
              </div>
              {errors.marks10 && (
                <p className="text-red-500 text-sm">{errors.marks10.message}</p>
              )}
            </div>

            {/* 12th Marksheet */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                12th Marksheet
              </label>
              <div className="flex items-end gap-1.5">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  {...register("marks12", {
                    required: "12th marksheet is required",
                  })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                />
                {/* <button
                  className="text-black bg-blue-400 mt-2 rounded px-2 h-[41px] w-[41px] flex items-center justify-center text-white cursor-pointer"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setVerifyText("HSC");
                  }}
                >
                  <MdAutorenew className="h-full" />
                </button> */}
              </div>
              {errors.marks12 && (
                <p className="text-red-500 text-sm">{errors.marks12.message}</p>
              )}
            </div>

            {/* College Certificate */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                College Certificate (PDF)
              </label>

              <div className="flex items-end gap-1.5">
                <input
                  type="file"
                  accept=".pdf"
                  {...register("college", {
                    required: "College certificate is required",
                  })}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                />

                {/* <button
                  className="text-black bg-blue-400 mt-2 rounded px-2 h-[41px] w-[41px] flex items-center justify-center text-white cursor-pointer"
                  type="button"
                  onClick={() => {
                    setIsOpen(true);
                    setVerifyText("Degree");
                  }}
                >
                  <MdAutorenew className="h-full" />
                </button> */}
              </div>
              {errors.college && (
                <p className="text-red-500 text-sm">{errors.college.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      }
       

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative max-h-[300px] min-h-[300px]">
              <div className="text-center flex justify-center max-h-[200px] min-h-[200px] items-center flex-col">
                <Loader />
                <p className="mt-5"> {verifyText} verifying...</p>
              </div>

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              {/* Modal Content */}
              {/* <h2 className="text-xl font-bold mb-4">Modal Title</h2> */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
