import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export default function EmailVerification() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");

  const onSubmit = async ({ code }) => {
    const userId = localStorage.getItem("userId");
  
    if (code === "654321") {
      try {
        await fetch(`http://localhost:5000/api/profile/verify/${userId}`, {
          method: "PATCH",
        });
    
        localStorage.setItem("userVerified", "true");  // optional, helps with gates
    
        setMessage("➤ Email verified successfully! Redirecting...");
        setMessageStyle("bg-green-100 text-green-700 px-4 py-2 rounded text-center mb-4 font-medium");
    
        // Reliable redirect
        navigate("/createprofile");
    
      } catch (err) {
        alert("Verification succeeded, but failed to update the server.");
      }
    }else {
      setMessage("Invalid verification code.");
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center text-secondary">

          {/* Message Block */}
          {message && (
            <div className={messageStyle}>
              {message}
            </div>
          )}

          {/* Email Icon */}
          <div className="w-30 h-30 mb-4 text-black-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M22 4H2a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h20a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2ZM2 6h20l-10 7L2 6Zm0 12V8l10 7 10-7v10H2Z" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold mb-6">Verify Your Email!</h1>
          <p className="text-2xl text-center mb-12">
            Please, enter the code that was sent to your email.
          </p>

          <div className="w-full max-w-sm mb-20 text-xl">
            <Controller
              name="code"
              control={control}
              rules={{
                required: "Code is required.",
                minLength: { value: 6, message: "Code must be 6 characters." },
                maxLength: { value: 6, message: "Code must be 6 characters." },
              }}
              render={({ field }) => (
                <Field
                  required
                  label="Code"
                  placeholder="654321"
                  type="number"
                  errorMessage={errors.code?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-6 mb-6 w-full max-w-sm text-xl flex flex-col items-center space-y-3">
            <PrimaryButton type="submit">Verify</PrimaryButton>

            <p className="text-md text-gray-600">
              Didn't receive code?{" "}
              <a href="#" className="text-blue-500 underline hover:text-blue-700">
                Resend
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}