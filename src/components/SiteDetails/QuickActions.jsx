import { useState } from "react";
import DailyUpdateModal from "./DailyUpdateModal";
import { WeeklySummaryModal } from "./WeeklySummaryModal";

const QuickActions=({siteId,onSubmitDailyUpdate,handleEditUpdate,openExportModal})=>{
    const [open,setOpen]=useState(false);
    const [upload,setUpload]=useState(false);

    
    return(
     <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm border border-gray-200">
         <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>

        <button
         onClick={()=>setOpen(true)}
         className="w-full flex items-center gap-2 bg-cyan-950 text-white font-medium px-4 py-3 rounded-xl mb-3 hover:bg-gray-800 transition"> 
        Add Today's update +</button>
        <button onClick={()=>alert("Feature coming soon")} className="w-full flex items-center gap-2 border border-gray-300 rounded-xl mb-4 hover:bg-gray-100 transition text-gray-800 text-black font-medium px-4 py-3"> Upload Documents</button>
        <button 
        onClick={openExportModal}
        className="w-full flex items-center gap-2 border border-gray-300 rounded-xl mb-4 hover:bg-gray-100 transition text-gray-800 text-black font-medium px-4 py-3"
        > 
        Export Summary</button>
       {open&&(
        <DailyUpdateModal 
        onClose={()=>setOpen(false)}
       onSubmitDailyUpdate={onSubmitDailyUpdate}
        open={open}
        mode="add"
        />
       )}
       {
        upload&&<UploadDocumentModal/>
       }

     </div>
  
    )
}
export default QuickActions;