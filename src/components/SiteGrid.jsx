import { useState, useEffect } from "react";
import SiteCard from "./SiteCard";
import AddSiteModal from "./AddSiteModal";
import { useUserSites,useCreateSite } from "../hooks/useSites";
import { ShimmerForm } from "./Shimmer";
const SiteGrid = () => {

  const createSite=useCreateSite();
  const{data:sites,isLoading,isError,error}=useUserSites();
  const [showModal, setShowModal] = useState(false);
 
  const handleAddSite=async (siteData)=>{
   try{
    await createSite.mutateAsync(siteData);
    setShowModal(false);
    alert("site craeted success");
   }catch(error){
    console.error("error craeting site",error);

   }
  }
  if (isLoading) return (<ShimmerForm/>);
  if (isError) return <div className="p-6">Error: {error?.message}</div>;


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">

        {/* Add New Site Button */}
        <SiteCard
          name="Add New Site +"
          onClick={()=>setShowModal(true)}
          isAddCard={true}
        />

        {/* All Site Cards */}
        {sites?.map((site, index) => (
          <SiteCard
            key={site.id || index}
            id={site.id}
            name={site.name}
            location={site.location}
            status={site.status}
            
          />
        ))}

      </div>

  
      {showModal && (
        <AddSiteModal
           mode="add"
          onSave={handleAddSite}
          open={open}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SiteGrid;



 