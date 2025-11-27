import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, User, Phone, Calendar, Pencil } from "lucide-react";
import EditSiteModal from "./EditSiteModal";
import { getSiteById } from "../../services/sitesService";

const SiteInfo = () => {
  const { id } = useParams();

  const [siteInfo, setSiteInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "",
    owner_name:"",
    contact:"",
    budget:"",
    notes:"",
    start_date:"",
    end_date:""

  });

  const [open, setOpen] = useState(false);

//fetching infor of site based on id from params
  useEffect(()=>{
  fetchSiteInfo(id)
  },[id]);

  const fetchSiteInfo=async(id)=>{
    const data=await getSiteById(id);
    setSiteInfo(data);
    setFormData(data);

  }
   
  const handleSave = (updated) => {
    setSiteInfo(updated);
    setFormData(updated);
    localStorage.setItem(`site-${id}`, JSON.stringify(updated));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Site Information
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          <Pencil size={16} /> Edit Site
        </button>
      </div>

      {/* Info List */}
      <div className="space-y-4">
        <InfoRow icon={<User size={18} />} label="Site Name" value={siteInfo?.name} />
        <InfoRow icon={<MapPin size={18} />} label="Location" value={siteInfo?.location} />
        <InfoRow icon={<User size={18} />} label="Owner" value={siteInfo?.owner_name} />
        <InfoRow icon={<Phone size={18} />} label="Phone" value={siteInfo?.phone} />
        <InfoRow icon={<Calendar size={18} />} label="Start Date" value={siteInfo?.start_date} />
      </div>

      {/* Edit Modal */}
      <EditSiteModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        data={siteInfo}
      />
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 border-b pb-3">
      <div className="text-gray-500">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value || "Not set"}</p>
      </div>
    </div>
  );
};

export default SiteInfo;
