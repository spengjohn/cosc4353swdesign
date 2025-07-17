import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons";
import Field from "../components/Field";
import { registerUser } from "../api/auth";
import cooglinklogo from "../assets/cooglinklogo.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!role) {
      setMessage("❌ Please select a role.");
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
      return;
    }

    const { status, data: result } = await registerUser(email, password, role);

    if (status === 201) {
      setMessage("🎉 Registration successful! Redirecting to email verification ➤");
      setMessageStyle("bg-green-100 text-green-700 px-4 py-2 rounded text-center mb-4 font-medium");
      setRedirecting(true);

      setTimeout(() => {
        navigate('/emailverification');
      }, 2000);

    } else if (status === 409) {
      setMessage("❌ Email already registered.");
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
    } else {
      setMessage(`❌ Registration failed: ${result.message || 'Unknown error'}`);
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
    }
  };

  return (
    <div className="flex flex-col items-center text-secondary w-full max-w-sm mx-auto">

      {/* Logo */}
      <img src={cooglinklogo} alt="CoogLinks Logo" className="h-24 mb-4" />

      <h1 className="text-3xl mb-4 font-semibold text-center">Register an Account:</h1>

      {/* Message Block */}
      {message && (
        <div className={messageStyle}>
          {message}
        </div>
      )}

      <div className="w-full max-w-sm">
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="Example@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-xl mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">-- Select Role --</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="mt-6 text-xl">
        <PrimaryButton onClick={handleRegister} disabled={redirecting}>
          Sign up
        </PrimaryButton>
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
