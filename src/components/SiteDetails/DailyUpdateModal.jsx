import { set } from "zod";
import ModalWrapper from "../ModalWrapper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DailyUpdateModal = ({ onClose, onSave,data,mode,openEdit,updateId }) => {
  const [form, setForm] = useState({
    date: "",
    workers: "",
    worker_wage: "",
    expenses: "",
    description:"",
    summary: ""
  });
  const {id}=useParams();
 useEffect(()=>{
   if(mode==="edit" && data){
    setForm(data);
  }
  },[data,mode]);
 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData={
      date:form.date,
      workers:parseInt(form.workers),
      worker_wage:parseFloat(form.worker_wage),
      expenses:parseFloat(form.expenses),
      description:form.description,
      summary:form.summary,
    
    }
    onSave(updateData);
    onClose();
  };
if(!openEdit) return null;
  return (
    <ModalWrapper onClose={onClose}>

      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-green-800">{(mode==="edit")?"Edit Daily Updates":"Add Daily Update"}</h2>
      <p className="text-gray-600 mb-4">
        Record today's construction progress.
      </p>
     
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="date" name="date" value={form.date} onChange={handleChange} className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
         <input type="number" name="workers" value={form.workers} placeholder="Workers" onChange={handleChange} className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />

        <input type="number" name="worker_wage" value={form.worker_wage} placeholder="Total worker wage" onChange={handleChange} className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />

        <input type="number" name="expenses" value={form.expenses} placeholder="Other Expenses" onChange={handleChange} className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
        <input type="text" name="description" value={form.description} placeholder="Description" onChange={handleChange} className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />


        <textarea name="summary" placeholder="Work Summary" value={form.summary} className="w-full border  border-gray-300 p-2 rounded-lg" onChange={handleChange} />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
            Save
          </button>
        </div>
      </form>
</div>
      </div>
      
    </ModalWrapper>
  );
};

export default DailyUpdateModal;
