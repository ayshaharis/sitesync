import DailyUpdateCard from "./DailyUpdateCard";

const DailyUpdates = ({ dailyUpdates,handleSaveUpdates }) => (
  <div className="space-y-4 mt-4">
    <h2 className="text-lg font-semibold mb-3">Daily Updates</h2>

    {dailyUpdates.length === 0 ? (
      <p className="text-gray-500 text-sm">No updates added yet.</p>
    ) : (
      dailyUpdates.map((update, index) => (
        <DailyUpdateCard 
        key={index}
         update={update} 
         onEditSave={(rowId,updatedData)=>handleSaveUpdates(rowId,updatedData)} />
      ))
    )}
  </div>
);

export default DailyUpdates;
