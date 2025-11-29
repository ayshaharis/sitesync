
import SiteInfo from "./SiteInfo";
import SiteProgress from "./SiteProgress";
import QuickActions from "./QuickActions";
import { useParams } from "react-router-dom";
import DailyUpdates from "./DailyUpdates";
import { useQuery } from "@tanstack/react-query";
import { useDailyUpdate, useSaveDailyUpdate,useEditDailyUpdate } from "../../hooks/useDailyUpdate";

const SiteDetails = () => {
  const { id } = useParams();

const {data:dailyUpdates,isLoading,isError}=useDailyUpdate(id);
const saveUpdate=useSaveDailyUpdate(id);
const editUpdate=useEditDailyUpdate(id);

const handleSaveUpdate = async (update) => {
  try{
 await saveUpdate.mutateAsync(update);
  }catch(error){
    console.error("Error saving daily update:", error);
  }
 
 };
 
  const handleEditUpdate = async (rowId, updatedData) => {
    try{
    await editUpdate.mutateAsync({ rowId, updatedData });
    }catch(error){
      console.error("Error editing daily update oops:", error);  
    }
  };

 return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
   
      {/* Left: Logs, Expenses, Visits */}
      <div className="space-y-6">
        <SiteInfo />
        {isLoading&&<p>Loading...</p>}
        {isError&&<p>Error loading daily updates.</p>}
      { dailyUpdates&& <DailyUpdates
       dailyUpdates={dailyUpdates} 
       handleSaveUpdates={handleEditUpdate}/>}
       
       
      </div>

      {/* Right: Info + Docs */}
      <div className="space-y-6">
         <QuickActions siteId={id} 
         handleSaveUpdate={handleSaveUpdate}/>
        <SiteProgress/>
       
    
       
       
      </div>
    </div>
  );
};

export default SiteDetails;
