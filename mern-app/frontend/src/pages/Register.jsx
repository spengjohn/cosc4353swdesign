import { Link } from "react-router-dom"; // <-- Make sure this is imported!
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function Register() {
  return (
    <div className="flex flex-col items-center text-secondary w-full max-w-sm mx-auto">
      <h1 className="text-3xl mb-12 font-semibold">Register an Account:</h1>
      <div className="w-full max-w-sm">
        <div className="text-xl mb-4">
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="Example@email.com"
            required
          />
        </div>
        <div className="text-xl mb-4">
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
      </div>

      <div className="mt-6 text-xl">
        <PrimaryButton>Sign up</PrimaryButton>
      </div>

      <p className="text-lg p-4 w-full max-w-sm text-center">
        Have an account?{" "}
        <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
