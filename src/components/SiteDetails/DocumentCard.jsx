import { FileText, IndianRupee, Building2, Image } from "lucide-react";

const categoryConfig = {
  "Contracts": {
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    icon: <FileText className="text-blue-500" size={28} />,
  },
  "Drawings": {
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-700",
    icon: <Building2 className="text-green-500" size={28} />,
  },
  "Bills And Invoices": {
    bg: "bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-700",
    icon: <IndianRupee className="text-yellow-500" size={28} />,
  },
  "Permits": {
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-700",
    icon: <FileText className="text-red-500" size={28} />,
  },
  "Photos": {
    bg: "bg-sky-50",
    badge: "bg-sky-100 text-sky-700",
    icon: <Image className="text-sky-500" size={28} />,
  },
};

const DocumentCard = ({ document }) => {
  const { file_name, created_at, category, file_url } = document;
  const config = categoryConfig[category] || {};

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
      
     
      <div className={`h-32 flex items-center justify-center ${config.bg || "bg-gray-50"}`}>
        {config.icon}
      </div>

 
      <div className="p-4 space-y-2">
        
        {/* Category badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.badge || "bg-gray-100 text-gray-600"}`}>
          {category}
        </span>

      
        <p className="text-sm font-medium truncate">{file_name}</p>

    
        <p className="text-xs text-gray-500">
          {new Date(created_at).toLocaleDateString()}
        </p>


        <div className="flex gap-4 pt-2 ">
          <a
            href={file_url}
            target="_blank"
            className="text-sm font-medium text-cyan-700 hover:underline"
          >
            View
          </a>
          <a
            href={file_url}
            download
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
