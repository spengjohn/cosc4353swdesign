import React from "react";
import Field from "./Field";
import MultiDatePickerField from "./MultiDatePickerField";
import Selector from "./Selector";
import DropdownMenu from "./DropdownMenu";
import PrimaryButton from "./Buttons";
import TertiaryButton from "./TertiaryButton";

export default function CreateEditEventCard({ onCancel, onSubmit, formData, setFormData }) {
  const handleRemoveDate = (dateToRemove) => {
    const newDates = formData.dates.filter((d) => d !== dateToRemove);
    setFormData({ ...formData, dates: newDates });
  };

  const formatDate = (d) => {
    try {
      const dateObj = typeof d === "string" ? new Date(d) : d?.toDate?.() || d;
      return dateObj?.toLocaleDateString("en-US");
    } catch {
      return d?.toString?.() || "";
    }
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

        <div className="relative z-20 bg-white border border-gray-300 rounded-md p-2 shadow-lg">
          <MultiDatePickerField
            label="Event Dates"
            value={formData.dates}
            onChange={(dates) => setFormData({ ...formData, dates })}
            name="event_dates"
          />
          {formData.dates?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.dates.map((date, i) => (
                <span
                  key={i}
                  className="flex items-center bg-primary text-white text-sm px-3 py-1 rounded-full"
                >
                  {formatDate(date)}
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(date)}
                    className="ml-2 text-xs bg-white text-primary rounded-full px-1 hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <Field
          label="Location"
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="123 Main St"
          required
        />

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
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <TertiaryButton onClick={onCancel}>Cancel</TertiaryButton>
          <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
