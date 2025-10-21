import { useState } from "react";
import useAppProvider from "../context/useAppProvider";

const SiteVisits = ({siteId}) => {
  const {visits,setVisits}=useAppProvider();


 

 const [visitInfo, setVisitInfo] = useState({
    date: "",
    visitor: "",
    notes: "",
  });
 

  const handleAddVisit = () => {
    
    if(!visitInfo.date||!visitInfo.visitor||!visitInfo.notes){
      alert("Please fill all inputs!");
      return;
    }
    const newVisit = { ...visitInfo, siteId };
    console.log("momeny of truth")
    console.log(newVisit);
    setVisits([...visits, newVisit]);
    setVisitInfo({
      date: "",
      visitor: "",
      notes: "",
    });

  };

  return (
    <div className="p-4">
<h3 className="font-bold text-xl mb-4">Site Visit Log</h3>      {/* ------- Visits Table ------- */}
      <table className="table-auto border-collapse border border-gray-300 text-left w-full shadow-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Visitor</th>
            <th className="border border-gray-300 px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {/* Render saved visits */}
          {visits
            .filter((visit) => visit.siteId === siteId)
            .map((visit, key) => (
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2">{visit.date}</td>
                <td className="border border-gray-300 px-4 py-2">{visit.visitor}</td>
                <td className="border border-gray-300 px-4 py-2">{visit.notes}</td>
              </tr>
            ))}

          {/* Input row */}
          <tr>
            <td >
              <input
                type="date"
                value={visitInfo.date}
                onChange={(e) =>
                  setVisitInfo({ ...visitInfo, date: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            </td>
            <td >
              <input
                type="text"
                value={visitInfo.visitor}
                onChange={(e) =>
                  setVisitInfo({ ...visitInfo, visitor: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
                placeholder="Visitor name"
              />
            </td>
            <td>
              <input
                type="text"
                value={visitInfo.notes}
                onChange={(e) =>
                  setVisitInfo({ ...visitInfo, notes: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
                placeholder="Notes"
              />
            </td>
          </tr>
        </tbody>
      </table>

   
      <button
        onClick={handleAddVisit}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Add Visit
      </button>
    </div>
  );
};

export default SiteVisits;
