import { Calendar, Users, Pencil } from "lucide-react";
import { useState } from "react";
import DailyUpdateModal from "./DailyUpdateModal";

const DailyUpdateCard = ({ update, onSubmitDailyUpdate }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const {
    id,
    date,
    workers,
    images = [],
    worker_wage,
    expenses,
    description,
    summary
  } = update;

  const totalExpense = Number(worker_wage) + Number(expenses);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-700" />
          <span className="text-sm font-semibold">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={18} className="text-gray-700" />
          <span className="text-gray-800 font-medium">
            {workers} workers
          </span>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
        >
          <Pencil size={16} /> Edit
        </button>
      </div>

      {/* Summary */}
      <div className="pb-4">
        <p className="text-gray-900 font-medium">Summary</p>
        <p className="text-gray-600 text-sm mt-1">
          {summary || "No summary provided"}
        </p>

        {/* Images */}
        {images&& (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((url, index) => (
              <img
                key={`${id}-${index}`}     
                src={url}
                alt={`Update Image ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Expenses */}
      <div className="text-sm text-gray-600">
        Worker’s wage: ₹{worker_wage} |{" "}
        {description || "Misc"}: ₹{expenses} |{" "}
        <span className="font-medium">
          Total: ₹{totalExpense}
        </span>
      </div>

      {/* Edit Modal */}
      {openEdit && (
        <DailyUpdateModal
          key={update?.id}                     // witghout this key the modal will be corrupted with old state
          openEdit={openEdit}
          data={update}
          mode="edit"
          updateId={id}
          onSubmitDailyUpdate={onSubmitDailyUpdate}
          onClose={() => setOpenEdit(false)}
        />
      )}
    </div>
  );
};

export default DailyUpdateCard;
