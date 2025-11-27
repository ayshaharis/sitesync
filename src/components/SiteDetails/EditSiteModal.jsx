import { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";

const EditSiteModal = ({ open, onClose, onSave, data }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    owner: "",
    phone: "",
    startDate: "",
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Site Details</h2>

      <div className="grid gap-3">
        <input
          name="name"
          placeholder="Site Name"
          value={form.name || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="owner"
          placeholder="Owner"
          value={form.owner || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={submit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </ModalWrapper>
  );
};

export default EditSiteModal;


//not needed anymore
