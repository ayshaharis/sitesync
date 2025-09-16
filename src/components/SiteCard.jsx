import { Link } from "react-router-dom";
const  SiteCard=({id,name,location,status})=>{
    return(
      <Link to={`/site/${id}`}>
          <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition cursor-pointer">
                <h1 className="text-lg font-bold">{name}</h1>
                <h3 className="text-gray-600">{location}</h3>
                <h3 className="text-sm text-blue-600">{status}</h3>
            </div>
      </Link>
        
       
    )
}


export default SiteCard;