
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
import DocumentGrid from "./DocumentGrid";
const SiteDetails = () => {
  const { id } = useParams();
  const [showSummaryModal, setShowSummaryModal] = useState(false);
const {data:dailyUpdates,isLoading,isError}=useDailyUpdate(id);
const {data:siteInfo}=useSite(id);
const sitename=siteInfo?.name||"Site";
const saveUpdate=useSaveDailyUpdate(id);
const editUpdate=useEditDailyUpdate(id);
  const [exporting, setExporting] = useState(false);
   const isInAppBrowser =
    /FBAN|FBAV|Instagram|WhatsApp|LinkedIn/i.test(navigator.userAgent);


//export summary feature
const handleExport = async (fromDate, toDate) => {
  if (isInAppBrowser) {
    alert(
     "To download the PDF, please open this page in Chrome or Safari."
    );
    return;
  }

  setExporting(true);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  let pdfWindow = null;

  if (isMobile) {
    pdfWindow = window.open("", "_blank");
 
  }

  try {
    const rows = await fetchSummaryByDate(fromDate, toDate, id);
    const doc = generatePDF(rows, sitename, fromDate, toDate);
    const fileName = `${sitename}-${fromDate}-to-${toDate}.pdf`;

    if (isMobile && pdfWindow) {
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      pdfWindow.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } else {
      doc.save(fileName);
    }
  } finally {
    setExporting(false);
    setShowSummaryModal(false);
  }
};



const handleSubmitDailyUpdate=async({mode,rowId,data,selectedImages,remainingImages})=>{
  try{
    if(mode==="edit"){
      await editUpdate.mutateAsync({ rowId, updatedData:data,selectedImages,remainingImages });
    }else{
      await saveUpdate.mutateAsync({data,selectedImages,remainingImages});
    }
  }catch(error){
    console.error("Error submitting daily update:", error);
  }
    }
    
  




 return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/**this for handling in app browser  */}
      { isInAppBrowser && (
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
    PDF export is blocked in this browser. Open in <strong>Chrome</strong> or <strong>Safari</strong>.
  </div>
)}
      {/* Left: Logs, Expenses, Visits */}
      <div className="space-y-6">
        <SiteInfo />
        {isLoading&&<ShimmerForm/>}
        {isError&&<p>Error loading daily updates.</p>}
      { dailyUpdates&& <DailyUpdates
       dailyUpdates={dailyUpdates} 
       onSubmitDailyUpdate={handleSubmitDailyUpdate}/>}
       
       
      </div>

      {/* Right: Info + Docs */}
      <div className="space-y-6">
         <QuickActions siteId={id} 
         onSubmitDailyUpdate={handleSubmitDailyUpdate}
         openExportModal={() => setShowSummaryModal(true)} />
        <SiteProgress />
          <DocumentGrid/>
      
       
       
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
