import DashBoardCard from "./DashBoardCard"
import { useQuery } from "@tanstack/react-query";
import { fetchActiveSites } from "../services/sitesService";
import { ShimmerForm } from "./Shimmer";

const DashBoard=({})=>{

  const {data,isLoading}=useQuery({
    queryKey:["active-sites-count"],
    queryFn:fetchActiveSites
  })
 const activeSitesCount=data ||0;
    
    
if(isLoading)return (<ShimmerForm/>)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                <DashBoardCard  title="Active Sites "value={activeSitesCount} isLoading={isLoading}/>
              
                
        </div>
   

    )
}

export default DashBoard;