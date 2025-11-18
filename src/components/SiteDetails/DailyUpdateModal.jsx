import ModalWrapper from "../ModalWrapper";
import { useState } from "react";

const DailyUpdateModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    date: "",
    workers: "",
    wage: "",
    expenses: "",
    notes: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h1 className="text-lg font-semibold mb-3">Add Daily Update</h1>
      <p className="text-gray-600 mb-4">
        Record today's construction progress.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="date" name="date" onChange={handleChange} className="input w-full" />

        <input type="number" name="workers" placeholder="Workers" onChange={handleChange} className="input w-full" />

        <input type="number" name="wage" placeholder="Total Wage" onChange={handleChange} className="input w-full" />

        <input type="number" name="expenses" placeholder="Other Expenses" onChange={handleChange} className="input w-full" />

        <textarea name="notes" placeholder="Describe work done today" className="w-full border p-2 rounded-lg" onChange={handleChange} />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Save
          </button>
        </div>
      </form>

    </ModalWrapper>
  );
};

export default DailyUpdateModal;
