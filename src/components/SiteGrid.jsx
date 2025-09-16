import { useState,useEffect } from "react";
import SiteCard from "./SiteCard";
import NewSiteForm from "./NewSiteForm";
const SiteGrid=()=>{
    const [sites,setSites]=useState([  
        { id:"1" ,name:"Home",location:"calicut",status:"completed"},
        { id:"2" ,name: "Resort", location: "Wayanad", status: "In-progress"},
        { id:"3" ,name: "Commercial Building", location: "Bangalore", status: "Completed"}] )
        useEffect(()=>{

            const savedSites=localStorage.getItem("sites");
            if(savedSites){
                try{
                    setSites(JSON.parse(savedSites));
                }
                catch(err){
                    console.error("error getting data from local storage",err);
                    
                }
            }
           
        },[])
  const handleAddSite=(newsite)=>{
    const newId=(sites.length+1).toString();
    const updatedSites=([...sites,{...newsite,id:newId}]);
    setSites(updatedSites)
    localStorage.setItem("sites",JSON.stringify(updatedSites))
  }

    return(
        <>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"> 
           {sites.map((site,index)=>(<SiteCard 
           key={site.id||index}
           id={site.id}
            name={site.name} 
            location={site.location}
            status={site.status}/>)
            
           )}
        </div>
     <NewSiteForm onAddSite={handleAddSite}/>
     
    </>
    )
}

export default SiteGrid;