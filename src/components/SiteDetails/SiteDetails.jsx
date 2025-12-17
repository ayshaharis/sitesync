
import SiteInfo from "./SiteInfo";
import SiteProgress from "./SiteProgress";
import QuickActions from "./QuickActions";
import { useParams } from "react-router-dom";
import DailyUpdates from "./DailyUpdates";
import { useDailyUpdate, useSaveDailyUpdate,useEditDailyUpdate } from "../../hooks/useDailyUpdate";
import { WeeklySummaryModal } from "./WeeklySummaryModal";
import { useState } from "react";
import { fetchSummaryByDate } from "../../services/dailyUpdatesService";
import { generatePDF } from "../../utils/pdfGenerator";
import { ShimmerForm } from "../Shimmer";
import { useSite } from "../../hooks/useSites";
const SiteDetails = () => {
  const { id } = useParams();
  const [showSummaryModal, setShowSummaryModal] = useState(false);
const {data:dailyUpdates,isLoading,isError}=useDailyUpdate(id);
const {data:siteInfo}=useSite(id);
const sitename=siteInfo?.name||"Site";
const saveUpdate=useSaveDailyUpdate(id);
const editUpdate=useEditDailyUpdate(id);
  const [exporting, setExporting] = useState(false);


//export summary feature
const handleExport = async (fromDate, toDate) => {
  setExporting(true);          

  try {
   
    const rows = await fetchSummaryByDate(fromDate, toDate, id);

    const doc = generatePDF(rows, sitename, fromDate, toDate);
    const fileName = `${sitename}-${fromDate}-to-${toDate}.pdf`;
    doc.save(fileName);

  } catch (error) {
    console.error("Error exporting summary:", error);
  } finally {
    setExporting(false);
    setShowSummaryModal(false);
  }
};

const handleSaveUpdate = async (rowId) => {
  try{
 await saveUpdate.mutateAsync(rowId);
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
        {isLoading&&<ShimmerForm/>}
        {isError&&<p>Error loading daily updates.</p>}
      { dailyUpdates&& <DailyUpdates
       dailyUpdates={dailyUpdates} 
       handleSaveUpdates={handleEditUpdate}/>}
       
       
      </div>

      {/* Right: Info + Docs */}
      <div className="space-y-6">
         <QuickActions siteId={id} 
         handleSaveUpdate={handleSaveUpdate}
         openExportModal={() => setShowSummaryModal(true)} />
        <SiteProgress/>
       
       
      </div>
      {
        showSummaryModal && (
          <WeeklySummaryModal
            onClose={() => setShowSummaryModal(false)}
            onExport={handleExport}
          />
        )
      }
    </div>
  );
};

export default SiteDetails;
