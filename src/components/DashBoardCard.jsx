const DashBoardCard = ({ title, value,isLoading }) => (
 <div className="bg-white rounded-xl p-3 shadow-md border border-gray-200">
  <h4 className="text-gray-700 font-medium">{title}</h4>
  {isLoading ? (
    <div className="animate-pulse">
      <div className="h-6 w-16 bg-gray-300 rounded mt-3"></div>
    </div>
  ) : (
    <p className="text-4xl font-bold text-green-600 mt-2">{value}</p>
  )}
</div>

);




export default DashBoardCard;