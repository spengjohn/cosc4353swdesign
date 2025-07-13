import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // handle login here
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-secondary">
      <div className="w-full max-w-sm px-4">
        <h1 className="text-center text-3xl font-semibold mb-10">
          Login to access your account.
        </h1>

<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
  <div>
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
  {...register("password", {
    required: "Password is required"
  })}
  errorMessage={errors.password?.message}
/>
  </div>

  <div className="mt-4 flex justify-center">
    <PrimaryButton type="submit">Log in</PrimaryButton>
  </div>
</form>


        <p className="text-center text-base mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 underline hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
