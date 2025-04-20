"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { signIn } from "next-auth/react";

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          return;
        }

        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        <Header showLogo={false} />
        <div className="bg-[#141414] text-white p-8 rounded-xl w-96 shadow-lg">
          <h2 className="text-2xl font-bold text-center">Sign up</h2>
          <p className="text-gray-500 text-center mb-6">Create your account</p>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 bg-transparent border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-600"
                } rounded-md focus:ring-2 focus:ring-gray-400`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 bg-transparent border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-600"
                } rounded-md focus:ring-2 focus:ring-gray-400`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 bg-transparent border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-600"
                } rounded-md focus:ring-2 focus:ring-gray-400`}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className={`w-full p-3 rounded-md transition cursor-pointer ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-gray-400 mx-2">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 p-3 border border-gray-600 rounded-md hover:bg-gray-800 transition cursor-pointer"
            onClick={() =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/dashboard",
              })
            }
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
