import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register data:", data);
    // Call registration API here if needed
  };

  return (
    <div className="flex flex-col items-center text-secondary w-full max-w-sm mx-auto">
      <h1 className="text-3xl mb-12 font-semibold">Register an Account:</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="text-xl mb-4">
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
        </div>
        <div className="text-xl mb-4">
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

        <div className="mt-6 text-xl">
          <PrimaryButton type="submit">Sign up</PrimaryButton>
        </div>
      </form>

      <p className="text-lg p-4 w-full max-w-sm text-center">
        Have an account?{" "}
        <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
