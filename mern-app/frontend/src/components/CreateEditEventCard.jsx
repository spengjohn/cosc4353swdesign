import React from "react";

const CreateEditEventCard = ({ onCancel, onSubmit, formData, setFormData }) => {
  return (
    <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create / Edit Event</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Event Name */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Event Name"
            maxLength={100}
            required
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Event Date */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">
            Event Date <span className="text-red-500">*</span>
          </label>
          <div className="border rounded p-2 text-gray-500 text-sm">
            [ Calendar Component Placeholder ]
          </div>
        </div>

        {/* Location */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Full Address"
            required
            className="w-full p-2 border rounded"
            value={formData.address || ""}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">City</label>
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        {/* State */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">State</label>
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border rounded"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">
            Event Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Event Description"
            required
            className="w-full p-2 border rounded h-24"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Skills */}
        <div className="col-span-2">
          <label className="block mb-1 font-medium text-gray-700">
            Required Skills <span className="text-red-500">*</span>
          </label>
          <div className="p-2 border rounded text-gray-500 text-sm">
            [ Skills Multi-Select Placeholder ]
          </div>
        </div>

        {/* Urgency */}
        <div className="col-span-2 flex justify-between items-center">
          <label className="text-gray-700 font-medium">
            Urgency <span className="text-red-500">*</span>
          </label>
          <select
            required
            className="p-2 border rounded w-1/2"
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
          >
            <option value="">Select urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={onSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditEventCard;
