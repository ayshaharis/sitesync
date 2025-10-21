import { useState } from "react";
import useAppProvider from "../context/useAppProvider";

const DailyLog = ({ siteId }) => {
  const { dailyLogs, setDailyLogs } = useAppProvider();
  const [isAdding, setIsAdding] = useState(false);

  const [newEntries, setNewEntries] = useState({
    date: "",
    worker: "",
    work: "",
    wage: "",
    paid: "",
    pending: "",
  });

  const handleAddEntry = () => {
    setIsAdding(true);
  };

  const handleSaveEntry = () => {
    if (
      !newEntries.date ||
      !newEntries.worker ||
      !newEntries.work ||
      !newEntries.wage ||
      !newEntries.paid
    ) {
      alert("Please enter all required fields!");
      return;
    }

    const updatedEntry = {
      ...newEntries,
      siteId: siteId,
      pending: (Number(newEntries.wage) || 0) - (Number(newEntries.paid) || 0),
    };

    setDailyLogs([...dailyLogs, updatedEntry]);
    setNewEntries({ date: "", worker: "", work: "", wage: "", paid: "", pending: "" });
    setIsAdding(false);
  };

  const handleCancelEntry = () => {
    setIsAdding(false);
    setNewEntries({ date: "", worker: "", work: "", wage: "", paid: "", pending: "" });
  };

  // Calculate total pending for this site
  const totalPending = dailyLogs
    .filter((entry) => entry.siteId === siteId)
    .reduce((acc, curr) => acc + (Number(curr.pending) || 0), 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <table className="table-auto border-collapse border border-gray-300 text-left w-full shadow-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Worker</th>
            <th className="border border-gray-300 px-4 py-2">Work</th>
            <th className="border border-gray-300 px-4 py-2">Wage</th>
            <th className="border border-gray-300 px-4 py-2">Paid</th>
            <th className="border border-gray-300 px-4 py-2">Pending</th>
          </tr>
        </thead>

        <tbody>
          {dailyLogs
            .filter((entry) => entry.siteId === siteId)
            .map((entry, key) => (
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.worker}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.work}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.wage}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.paid}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.pending}</td>
              </tr>
            ))}

          {isAdding && (
            <tr>
              <td>
                <input
                  type="date"
                  value={newEntries.date}
                  onChange={(e) => setNewEntries({ ...newEntries, date: e.target.value })}
                  className="border border-gray-300 px-4 py-2 w-full"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newEntries.worker}
                  onChange={(e) => setNewEntries({ ...newEntries, worker: e.target.value })}
                  className="border border-gray-300 px-4 py-2 w-full"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newEntries.work}
                  onChange={(e) => setNewEntries({ ...newEntries, work: e.target.value })}
                  className="border border-gray-300 px-4 py-2 w-full"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newEntries.wage}
                  onChange={(e) => setNewEntries({ ...newEntries, wage: e.target.value })}
                  className="border border-gray-300 px-4 py-2 w-full"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newEntries.paid}
                  onChange={(e) => setNewEntries({ ...newEntries, paid: e.target.value })}
                  className="border border-gray-300 px-4 py-2 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {newEntries.wage && newEntries.paid
                  ? Number(newEntries.wage) - Number(newEntries.paid)
                  : ""}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total Pending */}
      <p className="mt-2 font-semibold">Total Pending: {totalPending}</p>

      {/* Buttons below table */}
      <div className="mt-4 space-x-2">
        {isAdding ? (
          <>
            <button
              onClick={handleSaveEntry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancelEntry}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleAddEntry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add Entry
          </button>
        )}
      </div>
    </div>
  );
};

export default DailyLog;
