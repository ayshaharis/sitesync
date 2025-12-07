 import { Calendar, Users, Pencil, FileText } from "lucide-react";
import { useState } from "react";
import DailyUpdateModal from "./DailyUpdateModal";
const DailyUpdateCard = ({ update,onEditSave }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { date, workers, worker_wage, expenses, description,summary } = update;
  const totalExpense=Number(worker_wage)+Number(expenses);

  const handleSaveUpdates = (updatedData) => {
    onEditSave(update.id,updatedData); 
      setOpenEdit(false);

  };

  return (
<div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
  
  {/* Header Row: Date + Edit Button */}
  <div className="flex items-center justify-between pb-4">
    <div className="flex items-center gap-2">
      <Calendar size={16} className="text-gray-700" />
      <span className="text-sm font-semibold">{date}</span>
    </div>
     <div className="flex items-center gap-2">
      <Users size={18} className="text-gray-700" />
      <span className="text-gray-800 font-medium">{workers} workers</span>
    </div>

    <button
    onClick={()=>setOpenEdit(true)}
     className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-black rounded-lg text-sm">
      <Pencil size={16} /> Edit Site
    </button>
    
  </div>

  {/* Summary */}
  <div className="pb-4">
    <p className="text-gray-900 font-medium">Summary</p>
    <p className="text-gray-600 text-sm mt-1">
      {String(summary || "No summary provided")}
    </p>
  </div>


  {/* Workers + Expense */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    
   

    <div className=" gap-2">
      <span className="text-gray-600 text-sm mt-1">
         Worker's wage : ₹{worker_wage} | {String(description || "Misc")}: ₹{expenses} |Total Expense: ₹{totalExpense}
      </span>
    </div>

  </div>
  {openEdit && <DailyUpdateModal
  onClose={()=>setOpenEdit(false)}
  onSave={handleSaveUpdates}
  openEdit={openEdit}
  data={update}
  mode="edit"
  updateId={update.id}  
  />}

</div>
  );
};

export default DailyUpdateCard;
