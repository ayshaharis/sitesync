import { useDailyUpdate } from "../../hooks/useDailyUpdate";
import { useSite } from "../../hooks/useSites";
import { useParams } from "react-router-dom";
import { ShimmerDocumentCard } from "../Shimmer";

const SiteProgress = ( ) => {
  const {id}=useParams();
  const { data: dailyUpdates = [], isLoading, error } = useDailyUpdate(id);
  const { data: site,loading,isError } = useSite(id);
  console.log("siteId:", id);
console.log("site data:", site);
console.log("budget raw:", site?.budget);


  if (isLoading) return <p><ShimmerDocumentCard/></p>;
  if (error) return <p>Error loading updates</p>;

  const totalExpenses = dailyUpdates.reduce(
    (sum, item) =>
      sum + Number(item.worker_wage || 0) + Number(item.expenses || 0),
    0
  );
  const budget = Number(site?.budget || 999);

  const percentUsed =
    budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">
        Budget vs Expense Overview
      </h2>
      
      <p className="text-sm mb-2">
        ₹{totalExpenses.toFixed(2)} / ₹{budget.toFixed(2)}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-500 ${
            percentUsed < 70
              ? "bg-green-600"
              : percentUsed < 90
              ? "bg-yellow-500"
              : "bg-red-800"
          }`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>
 <p className="text-sm text-gray-600 mt-2">
      Remaining Budget: ₹{(budget - totalExpenses).toFixed(2)}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        {percentUsed.toFixed(1)}% used
      </p>
    </div>
  );
};

export default SiteProgress;
