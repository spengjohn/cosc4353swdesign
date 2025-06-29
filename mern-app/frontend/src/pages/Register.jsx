import { Link } from "react-router-dom"; // <-- Make sure this is imported!
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";

export default function Register() {
  return (
    <div className="flex flex-col items-center">
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
        <PrimaryButton>Sign up</PrimaryButton>
      </div>

      <p className="text-base p-4">
        Have an account?{" "}
        <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
