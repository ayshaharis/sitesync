import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const SiteCard = ({ id, name, location, status, onClick, isAddCard }) => {

  if (isAddCard) {
    return (
      <div
        onClick={onClick}
        className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-xl">
          +
        </div>
        <p className="font-medium">Add New Site</p>
        <p className="text-sm text-gray-500">Create a new construction site</p>
      </div>
    );
  }

  const statusStyles = {
    "In Progress": "bg-green-100 text-green-700",
    "Completed": "bg-blue-100 text-blue-700",
    "Pending": "bg-orange-100 text-orange-700",
  };

  return (
    <Link to={`/site/${id}`}>
      <div className="h-32 bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition">
        
        {/* Top row */}
        <div className="flex items-start justify-between">
          <h2 className="font-semibold text-lg">{name}</h2>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              statusStyles[status]
            }`}
          >
            {status}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin size={18} />
          <span>{location}</span>
        </div>

      </div>
    </Link>
  );
};

export default SiteCard;
