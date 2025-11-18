import { useState, useEffect } from "react";
import SiteCard from "./SiteCard";
import AddSiteModal from "./AddSiteModal";

const SiteGrid = () => {
  const [sites, setSites] = useState([
    { id: "1", name: "Home", location: "Calicut", status: "Completed" },
    { id: "2", name: "Resort", location: "Wayanad", status: "In Progress" },
    { id: "3", name: "Commercial Building", location: "Bangalore", status: "Completed" },
  ]);

  const [showModal, setShowModal] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedSites = localStorage.getItem("sites");
    if (savedSites) {
      try {
        setSites(JSON.parse(savedSites));
      } catch (err) {
        console.error("Error reading localStorage", err);
      }
    }
  }, []);

  // Open the modal
  const handleAddSite = () => {
    setShowModal(true);
  };

  // Save new site
  const handleSaveSite = (newSite) => {
    const newId = (sites.length + 1).toString();
    const updatedSites = [...sites, { ...newSite, id: newId }];

    setSites(updatedSites);
    localStorage.setItem("sites", JSON.stringify(updatedSites));

    setShowModal(false); // close modal after saving
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

      {/* Modal */}
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
