import DocumentCard from "./DocumentCard";
import {  useState } from "react";
import { useDocuments } from "../../hooks/useDocumentUpload";
import { useParams } from "react-router-dom";
import { FileText } from 'lucide-react';
import { ShimmerDocumentCard } from "../Shimmer";
const DocumentGrid = () => {
  const { id } = useParams();
  const { data: documents = [], isLoading, isError } = useDocuments(id);
  const [activeCategory, setActiveCategory] = useState("All Documents");

  const categories = [
    "All Documents",
    "Contracts",
    "Drawings",
    "Bills And Invoices",
    "Permits",
    "Photos",
    "Others",
  ];

  const getCount = (cat) =>
    cat === "All Documents"
      ? documents.length
      : documents.filter((doc) => doc.category === cat).length;

  const filteredDocuments =
    activeCategory === "All Documents"
      ? documents
      : documents.filter((doc) => doc.category === activeCategory);

  if (isLoading) return <div><ShimmerDocumentCard/></div>;
  if (isError) return <div>Error loading documents.</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Documents</h2>
        <FileText className="w-5 h-5 text-gray-600" />
      </div>


      <ul className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer transition
              ${
                activeCategory === cat
                  ? "bg-cyan-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {cat} ({getCount(cat)})
          </li>
        ))}
      </ul>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredDocuments.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
};



export default DocumentGrid;