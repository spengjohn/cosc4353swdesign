import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";
import { loginUser } from "../api/auth";
import cooglinklogo from "../assets/cooglinklogo.png";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("text-red-500");

  const onSubmit = async (data) => {
    const { status, data: result } = await loginUser(data.email, data.password);

    if (status === 200) {
      localStorage.setItem('userToken', result.token);
      localStorage.setItem('userRole', result.role);
      localStorage.setItem('userId', result.id);
      localStorage.setItem('userEmail', result.email);
      localStorage.setItem('isProfileComplete', result.isProfileComplete);

      setMessage("🎉 Welcome! Redirecting ➤");
      setMessageStyle("bg-green-100 text-green-700 px-4 py-2 rounded text-center mb-4 font-medium");

      setTimeout(() => {
        if (result.isProfileComplete) {
          navigate('/home');
        } else {
          navigate('/createprofile');
        }
      }, 1000);

    } else if (status === 401) {
      setMessage("❌ Invalid credentials. Please check your email and password.");
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
    } else {
      setMessage("❌ Login failed. Please try again.");
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
    }
  };

  return (
    <div className="flex flex-col items-center text-secondary w-full max-w-sm mx-auto">

      <img src={cooglinklogo} alt="CoogLinks Logo" className="h-24 mb-4" />

      <h1 className="text-center text-3xl font-semibold mb-4">
        Login to access your account.
      </h1>

      {message && (
        <div className={messageStyle}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mb-4">
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="Example@email.com"
          required
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email"
            }
          })}
          errorMessage={errors.email?.message}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          required
          {...register("password", { required: "Password is required" })}
          errorMessage={errors.password?.message}
        />

        <div className="mt-6 text-xl">
          <PrimaryButton type="submit">Log in</PrimaryButton>
        </div>
      </form>

      <p className="text-lg p-4 w-full max-w-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 underline hover:text-blue-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}
