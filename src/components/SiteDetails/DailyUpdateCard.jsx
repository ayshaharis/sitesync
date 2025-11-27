const DailyUpdateCard = ({ update }) => {
  const { date, workers, worker_wage, expenses, description,summary } = update;
  const totalExpense=Number(worker_wage)+Number(expenses);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm">

      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <span className="text-sm font-medium">{date}</span>
      </div>

      <p className="text-gray-800 text-base leading-relaxed mb-4">
        {summary || "No notes added"}
      </p>
         <p className="text-gray-800 text-base leading-relaxed mb-4">
        {description || "No notes added"}
      </p>


      <div className="flex items-center gap-8 text-sm text-gray-700">
     
        <div className="flex items-center gap-2">
          <span className="font-medium">{workers} Workers</span>
        </div>

        
        <div className="flex items-center gap-2">
          <span className="font-medium">Total Expense -₹{totalExpense}</span>
        </div>
      </div>
    </div>
  );
};

export default DailyUpdateCard;
