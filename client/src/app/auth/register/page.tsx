"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/app/lib/schemas/auth_schema";
import { signup } from "@/app/lib/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    console.log("Form submitted:", data);
    const response = await signup(data);
    console.log("Registration response:", response);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                First name is required
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">Last name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring focus-within:border-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="text-gray-500 ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring focus-within:border-blue-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPass")}
                className="w-full focus:outline-none"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="text-gray-500 ml-2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </button>
            </div>
            {errors.confirmPass && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.confirmPass.message === "string" &&
                  errors.confirmPass.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
