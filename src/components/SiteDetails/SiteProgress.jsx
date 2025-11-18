const SiteProgress=()=>{
   return (
  <div className="bg-white shadow rounded p-4">
    <h2 className="text-lg font-semibold mb-2">Site Progress</h2>

    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-green-600 h-4 rounded-full transition-all duration-500"
        style={{ width: "60%" }} // you’ll make this dynamic later
      ></div>
    </div>

    <p className="text-sm text-gray-600 mt-2">60% completed</p>
  </div>
);

}
 export default SiteProgress;