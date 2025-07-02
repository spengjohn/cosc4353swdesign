import { Link } from "react-router-dom"; // Make sure this is imported
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center text-secondary w-full max-w-sm mx-auto">
      {/* maybe we add the coogsLink logo here? */}
      <h1 className="text-center text-3xl font-semibold mb-4">Login to access your account.</h1>
      <div className="w-full max-w-sm  mb-4">
        <div className="mb-4 text-xl">
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="Example@email.com"
            required
          />
        </div>
        <div className="mb-4 text-xl"> 
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
        <PrimaryButton>Log in</PrimaryButton>
      </div>

      <p className="text-lg p-4 w-full max-w-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 underline hover:text-blue-700">
          Sign up
        </Link>
      </p>
    </div>
  );
}
