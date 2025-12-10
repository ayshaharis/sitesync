import ModalWrapper from "../ModalWrapper";
import { useState } from "react";
export const WeeklySummaryModal=({onClose,onExport})=>{

    const [fromDate,setFromDate]=useState(new Date().toISOString().split("T")[0]);
    const [toDate,setToDate]=useState(new Date().toISOString().split("T")[0]);


    return(
    <ModalWrapper onClose={onClose}>
        <div>
        <h2 className="text-xl font-semibold mb-4">Export Summary</h2>
        <h3>select a date range</h3>
        <input type="date"
         className="border p-2 m-2 w-full border border-gray-300 rounded-lg "
         value={fromDate} 
         onChange={(e)=>setFromDate(e.target.value)}/>
        <input
         type="date" 
        className="border p-2 m-2 w-full border border-gray-300 rounded-lg "
        value={toDate}
        onChange={(e)=>setToDate(e.target.value)} />
        <button onClick={()=>onExport(fromDate,toDate)}>Export updates as PDF</button>

        </div>


    </ModalWrapper>)

}