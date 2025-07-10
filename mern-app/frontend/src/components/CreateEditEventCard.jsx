import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Field from "./Field";
import Selector from "./Selector";
import DropdownMenu from "./DropdownMenu";
import PrimaryButton from "./Buttons";
import TertiaryButton from "./TertiaryButton";

export default function CreateEditEventCard({ onCancel, onSubmit, formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Event name is required.";
    } else if (formData.name.length > 100) {
      newErrors.name = "Event name must be 100 characters or fewer.";
    }

    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "Event description is required.";
    }

    if (!formData.address || formData.address.trim() === "") {
      newErrors.address = "Location is required.";
    }

    if (!formData.skills || formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required.";
    }

    if (!formData.urgency) {
      newErrors.urgency = "Urgency selection is required.";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(); // only able to submit if met requirements
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  return (
    <div className="bg-white text-secondary px-6 py-4 rounded border-2 border-solid flex flex-col w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Create / Edit Event</h2>

      <div className="flex flex-col gap-4">
        <Field
          label="Event Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Community Clean-Up"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <div className="flex flex-col">
          <label className="text-md font-medium block mb-1">
            Event Date & Time <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select date and time"
            className="w-full border border-gray-300 rounded-md p-2"
            minDate={new Date()}
            required
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <Field
          label="Max Volunteers"
          name="max_volunteers"
          type="number"
          min="1"
          value={formData.max_volunteers || ""}
          onChange={(e) =>
            setFormData({ ...formData, max_volunteers: parseInt(e.target.value) })
          }
          placeholder="Enter a number"
          required
        />

        <Field
          label="Location"
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="123 Main St"
          required
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        <div className="flex gap-4">
          <Field
            className="flex-1"
            label="City"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Houston"
            required
          />
          <Field
            className="flex-1"
            label="State"
            name="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="TX"
            required
          />
        </div>

        <Field
          label="Event Description"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Help clean the local park..."
          required
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-md font-medium block mb-1">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <Selector
              items={["Teamwork", "Coordination", "Physical Work", "People Skills"]}
              onSelect={(skills) => setFormData({ ...formData, skills })}
              name="skills"
            >
              Select Skills
            </Selector>
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
          </div>

          <div className="flex-1">
            <label className="text-md font-medium block mb-1">
              Urgency <span className="text-red-500">*</span>
            </label>
            <DropdownMenu
              items={["Low", "Medium", "High"]}
              onSelect={(urgency) => setFormData({ ...formData, urgency })}
              name="urgency"
            >
              {formData.urgency || "Select Urgency"}
            </DropdownMenu>
            {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <TertiaryButton onClick={onCancel}>Cancel</TertiaryButton>
          <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
