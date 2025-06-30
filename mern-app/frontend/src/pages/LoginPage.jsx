import { Link } from "react-router-dom"; // Make sure this is imported
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center text-secondary w-full max-w-sm mx-auto">
      <br />
      <div className="w-full max-w-sm">
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="Example@email.com"
          required
        />
        <br />
        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <div className="mt-6">
        <PrimaryButton>Log in</PrimaryButton>
      </div>

      <p className="text-base p-4 w-full max-w-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 underline hover:text-blue-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}
