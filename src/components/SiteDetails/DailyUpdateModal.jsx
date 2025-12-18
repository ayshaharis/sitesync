import ModalWrapper from "../ModalWrapper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dailyUpdateSchema } from "../../validation/dailyUpdateSchema";

const DailyUpdateModal = ({ onClose,open, onSave,data,mode,openEdit,updateId }) => {

  const {register,handleSubmit,formState:{errors},reset}=useForm(
    {
      resolver:zodResolver(dailyUpdateSchema),
      defaultValues:data||{}
    }
  );

  const {id}=useParams();
 useEffect(()=>{
   if(mode==="edit" && data){
  reset(data)
  }
  },[data,mode,reset]);
 

const onSubmit = (data) => {

  onSave(data,updateId);
  reset();
  onClose();
}
if(!openEdit && !open) return null;
  return (
    <ModalWrapper onClose={onClose}>

      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-green-800">{(mode==="edit")?"Edit Daily Updates":"Add Daily Updates"}</h2>
      <p className="text-gray-600 mb-4">
        Record today's construction progress.
      </p>
     
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input type="date" {...register("date")} placeholder="Enter Date" className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
         <input type="number" inputMode="numeric" {...register("workers")} placeholder="Total No.of workers" className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
         {errors.workers && <p className="text-red-500">{errors.workers.message}</p>}
        <input type="number" inputMode="numeric" {...register("worker_wage")} placeholder="Total worker wage"className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
        {errors.worker_wage && <p className="text-red-500">{errors.worker_wage.message}</p>}
        <input type="number" inputMode="numeric" {...register("expenses")} placeholder="Other Expenses" className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
        {errors.expenses && <p className="text-red-500">{errors.expenses.message}</p>}
        <input type="text" {...register("description")} placeholder="Description"  className=" w-full border border-gray-300 rounded-lg p-2 mt-1" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
         <textarea {...register("summary")} rows="4" placeholder="Work Summary" className="w-full border  border-gray-300 p-2 rounded-lg" />
        {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
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
