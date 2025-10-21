import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DailyLog from "./DailyLog";
import DailyExpenditure from "./DailyExpenditure";
import SiteVisits from "./SiteVisits";
import DocumentsUpload from "./DocumentsUpload";

const SiteDetails = () => {
  const { id } = useParams();
  const [siteInfo, setSiteInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owner: "",
    phone: "",
    startDate: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`site-${id}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSiteInfo(parsed);
      setFormData(parsed);
    }
  }, [id]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save to localStorage
  const handleSave = () => {
    setSiteInfo(formData);
    localStorage.setItem(`site-${id}`, JSON.stringify(formData));
    setIsEditing(false);
  };

  return (
  <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Left Side: Logs, Expenditure, Visits */}
    <div className="space-y-6">
      <DailyLog siteId={id} />
      <DailyExpenditure siteId={id} />
      <SiteVisits siteId={id}/>
    </div>

    {/* Right Side: Site Details */}
    <div className="max-w-md mx-auto bg-white shadow rounded p-6 h-full flex flex-col justify-between">
      <DocumentsUpload/>
      <h1 className="text-xl font-bold mb-4">Site #{id} Details</h1>

      {isEditing ? (
        <>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key}
              value={formData[key]}
              onChange={handleChange}
              className="border rounded w-full mb-2 px-2 py-1"
            />
          ))}
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </>
      ) : siteInfo ? (
        <div className="flex flex-col gap-2 flex-1">
          <p><b>Name:</b> {siteInfo?.name}</p>
          <p><b>Location:</b> {siteInfo?.location}</p>
          <p><b>Owner:</b> {siteInfo?.owner}</p>
          <p><b>Phone:</b> {siteInfo?.phone}</p>
          <p><b>Start Date:</b> {siteInfo?.startDate}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 flex-1">
          <p><b>Name:</b> {siteInfo?.name || "Not set"}</p>
          <p><b>Location:</b> {siteInfo?.location || "Not set"}</p>
          <p><b>Owner:</b> {siteInfo?.owner || "Not set"}</p>
          <p><b>Phone:</b> {siteInfo?.phone || "Not set"}</p>
          <p><b>Start Date:</b> {siteInfo?.startDate || "Not set"}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            {siteInfo ? "Edit" : "Add Details"}
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default SiteDetails;
