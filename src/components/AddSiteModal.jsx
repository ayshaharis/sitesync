import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

const AddSiteModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <ModalWrapper onClose={onClose}>
<div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-green-800">Add New Site</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="block text-sm text-gray-700">Site Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            >
              <option value="">Select Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
    </ModalWrapper>
  );
};

export default AddSiteModal;
