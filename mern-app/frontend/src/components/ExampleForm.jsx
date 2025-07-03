import { useForm, Controller } from "react-hook-form";
import Field from "../components/Field";
import DropdownMenu from "./DropdownMenu";
import CommentBox from "./CommentBox";
import Selector from "./Selector";
import MultiDatePicker from "./MultiDatePickerField";
import SingleDatePickerField from "./SingleDatePickerField";

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function TestForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-sm mx-auto">
        <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required." }}
            render={({ field }) => (
                <Field
                label="Name"
                placeholder="John Doe"
                {...field}
                errorMessage={errors.name?.message}
                />
            )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Field
              label="Email"
              placeholder="email@example.com"
              {...field}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="availableDates"
          control={control}
          defaultValue={[]}
          rules={{ required: "Please select at least one date." }}
          render={({ field }) => (
            <MultiDatePicker
              label="Available Dates"
              selectedDates={field.value}
              onChange={field.onChange}
              errorMessage={errors.availableDates?.message}
            />
          )}
        />


        <Controller
          name="eventDate"
          control={control}
          rules={{ required: "Date is required." }}
          render={({ field }) => (
            <SingleDatePickerField
              label="Event Date"
              {...field}
              errorMessage={errors.eventDate?.message}
            />
          )}
        />

        <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{ required: "State is required." }}
            render={({ field }) => (
                <DropdownMenu
                items={states}
                name="state"
                selected={field.value}
                onSelect={field.onChange}
                errorMessage={errors.state?.message}
                >
                {field.value || "Select State"}
                </DropdownMenu>
            )}
        />
        <Controller
            name="skills"
            control={control}
            rules={{required: "Skills are required."}}
            defaultValue={[]}
            render={({ field }) => (
                <Selector
                items={["Photography", "Teaching", "Coding", "First Aid"]}
                value={field.value}
                onChange={field.onChange}
                name="skills"
                errorMessage={errors.skills?.message}
                >
                {field.value.length > 0 ? "Edit Skills" : "Select Skills"}
                </Selector>
            )}
        />

        <CommentBox
            label="Your Comment"
            rows={5}
            {...register("comment")}
            errorMessage={errors.comment?.message}
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
/* <Field
  label="Zip Code"
  name="zipcode"
  type="text"
  placeholder="12345"
  required
  {...register("zipcode", {
    required: "Zip code is required",
    minLength: {
      value: 5,
      message: "Zip code must be 5 digits",
    },
    maxLength: {
      value: 5,
      message: "Zip code must be 5 digits",
    },
    pattern: {
      value: /^[0-9]+$/,
      message: "Zip code must be numeric",
    },
  })}
  errorMessage={errors.zipcode?.message}
/>
 */