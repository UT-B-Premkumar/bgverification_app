"use client";
import { useEffect, useState } from "react";
import Bg from "@/assets/images/bg.jpeg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "student") {
      router.push("/application");
    } else if (token && role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Basic frontend email format check
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({}); // ✅ clear previous errors

    // ✅ Step 1: Validation
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    // If there are validation errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setLoading(true);

    try {
      // ✅ Step 2: Send login request
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ Step 3: Store token
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result?.user?.role);
      localStorage.setItem("userId", result?.user?.id);

      // ✅ Step 4: Redirect
      toast.success("Login successful"); //
      if (result?.user?.role === "student") {
        router.push("/application");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err);

      setError({ general: err.message }); // general error key
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter your email"
              // required
            />
          </div>
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter your password"
              // required
            />
          </div>
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
