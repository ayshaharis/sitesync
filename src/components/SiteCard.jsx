import { Link } from "react-router-dom";
const  SiteCard=({id,name,location,status,onClick,isAddCard})=>{

  if(isAddCard){
    return (
         <div
        className="p-6 bg-green-100 border border-green-600 rounded-xl shadow cursor-pointer flex items-center justify-center text-green-700 font-semibold text-xl"
        onClick={onClick}
      >
        + Add New Site
      </div>

    )
  }
    return(
      <Link to={`/site/${id}`}>
          <div className="h-30 flex flex-col justify-between bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition cursor-pointer">
                <h1 className="text-lg font-bold">{name}</h1>
                <h3 className="text-gray-600">{location}</h3>
                <h3 className="text-sm text-blue-600">{status}</h3>
            </div>
      </Link>
        
       
    )
}


export default SiteCard;