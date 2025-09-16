import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DailyLog from "./DailyLog";
import DailyExpenditure from "./DailyExpenditure";

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
    <div>
        <DailyLog/>
        <DailyExpenditure/>
             <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
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
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            {isEditing?"save":"Edit"}
          </button>
        </>
      ) : siteInfo ? (
        <div>
          <p><b>Name:</b> {siteInfo?.name}</p>
          <p><b>Location:</b> {siteInfo?.location}</p>
          <p><b>Owner:</b> {siteInfo?.owner}</p>
          <p><b>Phone:</b> {siteInfo?.phone}</p>
          <p><b>Start Date:</b> {siteInfo?.startDate}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
           Edit
          </button>
        </div>
      ) :  (
      <div>
        <p><b>Name:</b> {siteInfo?.name || "Not set"}</p>
        <p><b>Location:</b> {siteInfo?.location || "Not set"}</p>
        <p><b>Owner:</b> {siteInfo?.owner || "Not set"}</p>
        <p><b>Phone:</b> {siteInfo?.phone || "Not set"}</p>
        <p><b>Start Date:</b> {siteInfo?.startDate || "Not set"}</p>

        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
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
