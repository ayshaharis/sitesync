import { useState, useEffect } from "react";
import SiteCard from "./SiteCard";
import AddSiteModal from "./AddSiteModal";
import {addSite,getSites} from "../services/sitesService";

const SiteGrid = () => {
const [sites, setSites] = useState([]);
  const [showModal, setShowModal] = useState(false);

useEffect(()=>{
  fetchSites();
},[]);
 const fetchSites=async()=>{
  const data=await getSites();
  setSites(data);
 }

 const handleSaveSite=async(newSite)=>{
  const addedSite=await addSite(newSite);
  setSites([...sites,addedSite]);
  setShowModal(false);
 }


  const handleAddSite = () => {
    setShowModal(true);
  };


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">

        {/* Add New Site Button */}
        <SiteCard
          name="Add New Site +"
          onClick={handleAddSite}
          isAddCard={true}
        />

        {/* All Site Cards */}
        {sites.map((site, index) => (
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
          onSave={handleSaveSite}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SiteGrid;
