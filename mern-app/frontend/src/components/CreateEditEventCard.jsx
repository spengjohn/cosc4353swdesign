import { Controller, useForm } from "react-hook-form";
import { useEffect , useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Field from "./Field";
import Selector from "./Selector";
import DropdownMenu from "./DropdownMenu";
import PrimaryButton from "./Buttons";
//import TertiaryButton from "./TertiaryButton";
import { createEvent, updateEvent } from "../api/event";
import states from "../data/states";
import skills from "../data/skills";
import { useNavigate } from "react-router-dom";

export default function CreateEditEventCard({ onCancel, onSubmit, event }) {
  const isEditMode = !!event;
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("text-red-500");
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      city: "",
      state: "",
      skillsRequired: [],
      urgency: "",
      date: null,
      maxVolunteers: "",
      assignedVolunteers: [],
    },
  });

  useEffect(() => {
  if (event) {
    setValue("title", event.title);
    setValue("description", event.description);
    setValue("location", event.location);
    setValue("city", event.city);
    setValue("state", event.state);
    setValue("skillsRequired", event.skillsRequired || []);
    setValue("urgency", event.urgency);
    setValue("date", event.date ? new Date(event.date) : null);
    setValue("maxVolunteers", event.maxVolunteers);
    setValue("assignedVolunteers", event.assignedVolunteers || []);
  }
}, [event, setValue]);

  const handleFormSubmit = async (data) => {
  try {
    if (isEditMode) {
      const assignedCount = event.assignedVolunteers?.length || 0;

const isSameDate =
  new Date(event.date).toISOString().slice(0, 10) ===
  new Date(data.date).toISOString().slice(0, 10);

const isSameSkills =
  Array.isArray(event.skillsRequired) &&
  Array.isArray(data.skillsRequired) &&
  event.skillsRequired.length === data.skillsRequired.length &&
  event.skillsRequired.every(skill => data.skillsRequired.includes(skill));

const isSameCity = event.city === data.city;
const isSameState = event.state === data.state;

if ((isSameDate && isSameSkills && isSameCity && isSameState) || assignedCount === 0) {
  await updateEvent(event._id, data);
  setMessage("Event Updated!");
  setMessageStyle("bg-green-100 text-green-700 px-4 py-2 rounded text-center mb-4 font-medium");
  if (onSubmit) {
    setTimeout(() => {
      onSubmit();
    }, 1500); // 1.5 seconds delay
  }
} else {
  setMessage("Please remove all assigned volunteers before making changes to City, State, Date, or Skills fields.");
  setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
}

    } else {
      await createEvent(data); // call your real API
      if (onSubmit) {
      setTimeout(() => {
        onSubmit();
      }, 1500); // 1.5 seconds delay
  }
      setMessage("Event Created");
      setMessageStyle("bg-red-100 text-red-700 px-4 py-2 rounded text-center mb-4 font-medium");
    }
  } catch (err) {
    console.error("Failed to submit event form", err);
  }
};


  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white text-secondary px-6 py-4 rounded border-2 border-solid flex flex-col w-full max-w-2xl h-[90vh] overflow-auto"
    >
      
      <h2 className="text-2xl font-bold mb-4">
        {event ? "Edit Event" : "Create Event"}
      </h2>


      <div className="flex flex-col gap-4">
        {/* Event Name */}
        <Field
          label="Event Name"
          name="title"
          placeholder="Community Clean-Up"
          required
          {...register("title", {
            required: "Event name is required.",
            maxLength: {
              value: 100,
              message: "Event name must be 100 characters or fewer.",
            },
          })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        {/* Event Date  */}
        <div className="flex flex-col">
          <label className="text-md font-medium block mb-1">
            Event Date <span className="text-red-500">*</span>
          </label>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Event date is required." }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="w-full border border-gray-300 rounded-md p-2"
                minDate={new Date()}
              />
            )}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

        </div>

        {/* Max Volunteers */}
        <Field
          label="Max Volunteers"
          name="maxVolunteers"
          type="number"
          required
          placeholder="Enter a number"
          {...register("maxVolunteers", {
            required: "Max volunteers is required.",
            min: {
              value: 1,
              message: "Must be at least 1 volunteer",
            },
          })}
        />
        {errors.maxVolunteers && (
          <p className="text-red-500 text-sm">{errors.maxVolunteers.message}</p>
        )}
        
        {/* Hidden assignedVolunteers */}
        <input
          type="hidden"
          {...register("assignedVolunteers")}
        />

        {/* Location */}
        <Field
          label="Location"
          name="location"
          placeholder="123 Main St"
          required
          {...register("location", {
            required: "Location is required.",
          })}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

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
          <Controller
                name="state"
                control={control}
                rules={{ required: "State is required." }}
                render={({ field }) => (
                  <div className="flex-1 self-baseline-last flex-col flex">
                    <label className="block text-md font-medium mb-1">
                      State<span className="text-red-500"> *</span>
                    </label>
                    <DropdownMenu
                      required
                      items={states}
                      selected={field.value}
                      onSelect={field.onChange}
                      errorMessage={errors.state?.message}
                    >
                      {field.value || "State select"}
                    </DropdownMenu>
                  </div>
                )}
              />
            </div>
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
            <Controller
              name="skillsRequired"
              control={control}
              rules={{required: "Select at least one skill."}}
              render={({field})=> (
                <Selector
                  items={skills}
                  name={"skillsRequired"}
                  value={field.value}
                  onChange={field.onChange}
                  errorMessage={errors.skillsRequired?.message}
            >
              
            
              {field.value?.length ? "Edit Skills" : "Skill select"}
            </Selector>)}/>
            {/*errors.skillsRequired && <p className="text-red-500 text-sm">{errors.skillsRequired.message}</p>*/}
          </div>

          {/* Urgency */}
          <div className="flex-1">
            <label className="text-md font-medium block mb-1">
              Urgency <span className="text-red-500">*</span>
            </label>
            <Controller
              name="urgency"
              control={control}
              rules={{ required: "Urgency is required." }}
              render={({ field }) => (
                <DropdownMenu
                  items={["Low", "Medium", "High"]}
                  onSelect={field.onChange}
                  name="urgency"
                >
                  {field.value || "Select Urgency"}
                </DropdownMenu>
              )}
            />
            {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency.message}</p>}

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirm(true); // show confirmation box only
            }}
            className={`
              text-[#B80C09] border-2 border-[#B80C09] rounded px-4 py-2 font-semibold
              hover:bg-[#B80C09] hover:text-white transition-all duration-200
              w-fit
            `}
          >
            Cancel
          </button>
          
          <PrimaryButton type="submit">Submit</PrimaryButton>
          {showConfirm && (
            <div className="fixed inset-0 z-50  flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <p className="text-sm text-gray-800 mb-4">
                  Confirm cancellation? Unsaved data will be lost.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirm(false);
                      if (onCancel) onCancel();
                      navigate("/manageevents", { replace: true });
                    }}
                    className="text-sm px-4 py-2 rounded border border-red-500 text-red-600 hover:bg-red-100"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirm(false);
                    }}
                    className="text-sm px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      {message && (
  <div className={messageStyle}>
    {message}
  </div>
)}

    </form>
  );
}
