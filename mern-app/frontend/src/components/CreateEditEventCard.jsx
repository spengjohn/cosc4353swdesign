import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Field from "./Field";
import Selector from "./Selector";
import DropdownMenu from "./DropdownMenu";
import PrimaryButton from "./Buttons";
import TertiaryButton from "./TertiaryButton";

export default function CreateEditEventCard({ onCancel, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      skills: [],
      urgency: "",
      date: null,
      max_volunteers: "",
    },
  });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const selectedUrgency = watch("urgency");
  const selectedDate = watch("date");

  useEffect(() => {
    register("skills", {
      validate: (value) =>
        Array.isArray(value) && value.length > 0 || "At least one skill is required.",
    });
    register("urgency", {
      required: "Urgency selection is required.",
    });
    register("date", {
      required: "Event date is required.",
    });
  }, [register]);

  const handleSkillSelect = (skills) => {
    setSelectedSkills(skills);
    setValue("skills", skills, { shouldValidate: true });
    trigger("skills");
  };

  const handleUrgencySelect = (urgency) => {
    setValue("urgency", urgency, { shouldValidate: true });
    trigger("urgency");
  };

  const handleDateChange = (date) => {
    setValue("date", date, { shouldValidate: true });
    trigger("date");
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white text-secondary px-6 py-4 rounded border-2 border-solid flex flex-col w-full max-w-2xl h-[90vh] overflow-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Create / Edit Event</h2>

      <div className="flex flex-col gap-4">
        {/* Event Name */}
        <Field
          label="Event Name"
          name="name"
          placeholder="Community Clean-Up"
          required
          {...register("name", {
            required: "Event name is required.",
            maxLength: {
              value: 100,
              message: "Event name must be 100 characters or fewer.",
            },
          })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        {/* Event Date & Time */}
        <div className="flex flex-col">
          <label className="text-md font-medium block mb-1">
            Event Date & Time <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select date and time"
            className="w-full border border-gray-300 rounded-md p-2"
            minDate={new Date()}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        {/* Max Volunteers */}
        <Field
          label="Max Volunteers"
          name="max_volunteers"
          type="number"
          placeholder="Enter a number"
          {...register("max_volunteers", {
            required: "Max volunteers is required.",
            min: {
              value: 1,
              message: "Must be at least 1 volunteer",
            },
          })}
        />
        {errors.max_volunteers && (
          <p className="text-red-500 text-sm">{errors.max_volunteers.message}</p>
        )}

        {/* Location */}
        <Field
          label="Location"
          name="address"
          placeholder="123 Main St"
          required
          {...register("address", {
            required: "Location is required.",
          })}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

        {/* City and State */}
        <div className="flex gap-4">
          <Field
            className="flex-1"
            label="City"
            name="city"
            placeholder="Houston"
            required
            {...register("city", {
              required: "City is required.",
            })}
          />
          <Field
            className="flex-1"
            label="State"
            name="state"
            placeholder="TX"
            required
            {...register("state", {
              required: "State is required.",
            })}
          />
        </div>

        {/* Description */}
        <Field
          label="Event Description"
          name="description"
          placeholder="Help clean the local park..."
          required
          {...register("description", {
            required: "Event description is required.",
          })}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Skills */}
          <div className="flex-1">
            <label className="text-md font-medium block mb-1">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <Selector
              items={["Teamwork", "Coordination", "Physical Work", "People Skills"]}
              name="skills"
              onSelect={handleSkillSelect}
            >
              Select Skills
            </Selector>
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
          </div>

          {/* Urgency */}
          <div className="flex-1">
            <label className="text-md font-medium block mb-1">
              Urgency <span className="text-red-500">*</span>
            </label>
            <DropdownMenu
              items={["Low", "Medium", "High"]}
              onSelect={handleUrgencySelect}
              name="urgency"
            >
              {selectedUrgency || "Select Urgency"}
            </DropdownMenu>
            {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <TertiaryButton type="button" onClick={onCancel}>
            Cancel
          </TertiaryButton>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div>
      </div>
    </form>
  );
}
