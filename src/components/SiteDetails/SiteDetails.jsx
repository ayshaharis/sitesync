
import DailyLog from "./DailyLog";
import DailyExpenditure from "./DailyExpenditure";
import SiteVisits from "./SiteVisits";
import DocumentsUpload from "./DocumentsUpload";
import SiteInfo from "./SiteInfo";
import SiteProgress from "./SiteProgress";
import QuickActions from "./QuickActions";
import { useParams } from "react-router-dom";

const SiteDetails = () => {
  const { id } = useParams();


 return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
   
      {/* Left: Logs, Expenses, Visits */}
      <div className="space-y-6">
        <SiteInfo />
        <DailyLog />
        <DailyExpenditure />
        <SiteVisits />
      </div>

      {/* Right: Info + Docs */}
      <div className="space-y-6">
         <QuickActions siteId={id}/>
        <SiteProgress/>
        <DocumentsUpload />
    
       
       
      </div>
    </div>
  );
};

export default SiteDetails;
