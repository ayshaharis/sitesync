
import SiteInfo from "./SiteInfo";
import SiteProgress from "./SiteProgress";
import QuickActions from "./QuickActions";
import { useParams } from "react-router-dom";
import DailyUpdates from "./DailyUpdates";
import { useEffect, useState } from "react";
import { fetchDailyUpdates,saveDailyUpdates } from "../../services/dailyUpdatesService";

const SiteDetails = () => {
  const { id } = useParams();
  
  const [dailyUpdates,setDailyUpdates]=useState([])
  useEffect(()=>{
    fetchUpdates(id);
  },[id]);

  const fetchUpdates=async(id)=>{
    const data=await fetchDailyUpdates(id);
    setDailyUpdates(data);
  }
  //this data is coming from child quickactions 
const handleSaveUpdate=async(update)=>{
  console.log("save update called in site details with id:",id);
  await saveDailyUpdates(update,id);
 fetchUpdates(id);
}

 return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
   
      {/* Left: Logs, Expenses, Visits */}
      <div className="space-y-6">
        <SiteInfo />
        <DailyUpdates dailyUpdates={dailyUpdates}/>
       
       
      </div>

      {/* Right: Info + Docs */}
      <div className="space-y-6">
         <QuickActions siteId={id} handleSaveUpdate={handleSaveUpdate}/>
        <SiteProgress/>
       
    
       
       
      </div>
    </div>
  );
};

export default SiteDetails;
