"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function CreateAccountForm() {
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setPassword(val);
    const strength = val.length >= 8 ? (/[A-Z]/.test(val) && /[0-9]/.test(val) ? "Strong" : "Medium") : "Weak";
    setPasswordStrength(strength);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Add your submit logic here
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create Your Account</h2>
      <p className="text-center text-gray-500 mb-4">Welcome! Create your account to access exclusive deals, track orders, and enjoy a personalized shopping experience.</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
          <input id="name" name="name" type="text" required className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
          <input id="email" name="email" type="email" required className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
          <input id="password" name="password" type="password" required value={password} onChange={handlePasswordChange} className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600" />
          <div
            className={`text-xs mt-1 ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                ? "text-orange-500"
                : "text-green-600"
            }`}
          >
            Password strength: {passwordStrength}
          </div>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={handleConfirmPasswordChange} className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600" />
        </div>
        <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
      </form>
      <div className="flex flex-col gap-3 mt-4">
        <form action={() => signIn("google") }>
          <button type="submit" className="flex items-center justify-center w-full gap-3 rounded-md bg-white border border-gray-300 px-3 py-2 text-base font-semibold text-gray-700 shadow hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors">
            <Image src="/google.svg" alt="Google" width={24} height={24} />
            <span className="flex-1 text-center">Sign up with Google</span>
          </button>
        </form>
        <form action={() => signIn("github") }>
          <button type="submit" className="flex items-center justify-center w-full gap-3 rounded-md bg-[#181717] px-3 py-2 text-base font-semibold text-white shadow hover:bg-[#232323] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors">
            <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            <span className="flex-1 text-center">Sign up with GitHub</span>
          </button>
        </form>
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/customer/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Log in</a>
      </p>
    </>
  );
}
