import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

const AddSiteModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "",
    owner_name:"",
    contact:"",
    budget:"",
    notes:"",
    start_date:"",
    end_date:""

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    console.log(formData);
  };

  return (
    <ModalWrapper onClose={onClose}>
<div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-green-800">Add New Site</h2>

        <form onSubmit={handleSubmit}className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="block text-sm text-gray-700">Site Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
               className=" w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
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
            <label className="block text-sm text-gray-700">Owner's Name</label>
            <input
              type="text"
              name="owner_name"
              value={formData.owner}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
              <div>
            <label className="block text-sm text-gray-700">Contact</label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
               <div>
            <label className="block text-sm text-gray-700">Work type</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
          </div>
              <div>
            <label className="block text-sm text-gray-700">Enter estimated budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
              <div>
            <label className="block text-sm text-gray-700">Estimated Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.startdate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
              <div>
            <label className="block text-sm text-gray-700">Estimated closure date</label>
            <input
              type="date"
              name="end_date"
              value={formData.enddate}
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
