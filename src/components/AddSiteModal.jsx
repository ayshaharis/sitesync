import { useState,useEffect, use } from "react";
import ModalWrapper from "./ModalWrapper";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSchema } from "../validation/siteSchema";
const AddSiteModal = ({mode,data,open ,onSave, onClose }) => {
  const {register,handleSubmit,formState:{errors},reset}=useForm(
    {resolver:zodResolver(siteSchema),
      defaultValues:data||{}
    }

  );
   const {id}=useParams();

  useEffect(()=>{
    if(mode==="edit" && data){
      reset(data)
    }
  },[data,mode,reset])


  const onSubmit = (data) => {
    onSave(data,id);
       reset();
    onClose();
 
  };

  if(!open) return null;

  return (
    <ModalWrapper onClose={onClose}>
<div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-green-800">{mode==="edit"?"Edit site information":"Add new site details"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="block text-sm text-gray-700">Site Name</label>
            <input
              type="text"
              {...register("name")}
               className=" w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.name&&(<p className="text-red-500 text-sm">{errors.name.message}</p>)}
          </div>

          <div className="flex flex-col">
            <label className="block text-sm text-gray-700">Location</label>
            <input
              type="text"
              {...register("location")}
            
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.location&&(<p className="text-red-500 text-sm">{errors.location.message}</p>)}
          </div>
              <div>
            <label className="block text-sm text-gray-700">Owner's Name</label>
            <input
              type="text"
              {...register("owner_name")}
         
 
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.owner_name&&(<p className="text-red-500 text-sm">{errors.owner_name.message}</p>)}
          </div>
              <div>
            <label className="block text-sm text-gray-700">Contact</label>
            <input
              type="number"
              {...register("contact")}
         
    
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.contact&&(<p className="text-red-500 text-sm">{errors.contact.message}</p>)}
               </div>
               <div>
            <label className="block text-sm text-gray-700">Work type</label>
            <input
              type="text"
              {...register("notes")}
     
          
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
          
          </div>
       
              <div>
            <label className="block text-sm text-gray-700">Enter estimated budget</label>
            <input
              type="number"
{...register("budget")}
        
            
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
            {errors.budget&&(<p className="text-red-500 text-sm">{errors.budget.message}</p>)}
          </div>
              <div>
            <label className="block text-sm text-gray-700">Estimated Start Date</label>
            <input

              type="date"
         
              {...register("start_date")}
         
             
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
             {errors.date&&(<p className="text-red-500 text-sm">{errors.start_date.message}</p>)}
          </div>
              <div>
            <label className="block text-sm text-gray-700">Estimated closure date</label>
            <input
              type="date"
             
              {...register("end_date")}
              
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            />
             {errors.end_date&&(<p className="text-red-500 text-sm">{errors.end_date.message}</p>)}
          </div>


          <div>
            <label className="block text-sm text-gray-700">Status</label>
            <select
     
              {...register("status")}
              
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
