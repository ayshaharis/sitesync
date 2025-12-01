import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, User, Phone, Calendar, Pencil } from "lucide-react";
import AddSiteModal from "../AddSiteModal";
import { useSite,useUpdateSite } from "../../hooks/useSites";


const SiteInfo = () => {

const { id } = useParams();
const {data:siteInfo,isLoading,isError,error}=useSite(id);
console.log(siteInfo);
const [open, setOpen] = useState(false);

const updateSite=useUpdateSite();
const handleSave=async(updatedFormData,id)=>{
  console.log("edited site info--",updatedFormData);
  try{
    await updateSite.mutateAsync({siteId:id,updates:updatedFormData});
    setOpen(false);
  }catch(error){
    console.error("error editing siteinfo")
  }
}
  // const handleSave = async(updatedFormData,id) => {
  //   console.log("handle save clicked with id:", id);
  //   const updatedData=await updateSiteById(updatedFormData,id);
  //   setSiteInfo(updatedData);
   
  // };
  if (isLoading) return <div className="p-6">Loading sites...</div>;
  if (isError) return <div className="p-6">Error: {error?.message}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Site Information
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-cyan-950 text-white rounded-xl hover:bg-gray-800 transition"
        >
          <Pencil size={16} /> Edit Site
        </button>
      </div>

      {/* Info List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow icon={<User size={18} />} label="Site Name" value={siteInfo?.name} />
        <InfoRow icon={<MapPin size={18} />} label="Location" value={siteInfo?.location} />
        <InfoRow icon={<User size={18} />} label="Owner" value={siteInfo?.owner_name} />
        <InfoRow icon={<Phone size={18} />} label="Phone" value={siteInfo?.contact} />
        <InfoRow icon={<Calendar size={18} />} label="Start Date" value={siteInfo?.start_date} />
        <InfoRow icon={<Calendar size={18} />} label="Estimated Closure date" value={siteInfo?.end_date} />
        <InfoRow icon={<Calendar size={18} />} label="Estimated Budget" value={siteInfo?.budget} />
       <InfoRow icon={<Calendar size={18} />} label="Work status" value={siteInfo?.status} />

      </div>

    
      {<AddSiteModal
      mode="edit"
      onSave={handleSave}
      data={siteInfo}
      open={open}
      onClose={()=>setOpen(false)}/>}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4  pb-3">
      <div className="text-gray-500">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value || "Not set"}</p>
      </div>
    </div>
  );
};

export default SiteInfo;
