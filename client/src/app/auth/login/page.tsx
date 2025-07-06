"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "@/app/lib/auth";
import { loginSchema, LoginSchema } from "@/app/lib/schemas/auth_schema";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log("Logging in with:", data);
    const respone = await login(data);
    console.log("Login response:", respone);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.email.message === "string"
                  ? errors.email.message
                  : "Email is required"}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring focus-within:ring-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className="w-full focus:outline-none text-gray-800"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="text-gray-500 ml-2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.password.message === "string"
                  ? errors.password.message
                  : "Password is required"}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
