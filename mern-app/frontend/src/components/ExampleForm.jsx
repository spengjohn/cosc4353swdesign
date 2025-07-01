import { useForm } from "react-hook-form";
import Field from "../components/Field";

export default function TestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-sm mx-auto">
      <Field
        label="Name"
        name="name"
        placeholder="John Doe"
        required
        {...register("name", { required: "Name is required" })}
        errorMessage={errors.name?.message}
      />

      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
        errorMessage={errors.email?.message}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
