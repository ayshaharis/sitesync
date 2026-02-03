import {  useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { useDocumentUpload } from "../../hooks/useDocumentUpload";
import {Upload} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const UploadDocumentModal = ({ onClose }) => {
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);
  const [showError,setShowError]=useState(false);
  const {id}=useParams();
    const {
    uploadDocument,
    isUploading,
    isError,
    isSuccess
}=useDocumentUpload();
useEffect(()=>{
    if(isSuccess){
      onClose();
    }
},[isSuccess,onClose])

  const handleFileChange = (e) => {
    const filesArray=Array.from(e.target.files);
    const documentList=filesArray.map((file)=>(
      {
        id:crypto.randomUUID(),
        name:file.name,
        size:file.size,
        type:file.type,
        file,
        lastModified:file.lastModified,
        category:null
      }

    ))
    setDocuments((prev)=>[...prev,...documentList])
  };
//when user seletcs file to upload the category should be selected for each file
  const onCategoryChange=(docId,newCategory)=>{
   const updatedDocuments=documents.map((doc)=>(
    doc.id===docId?{...doc,category:newCategory}:doc
))
setDocuments(updatedDocuments);
  }

  const isAllCategoriesSelected=documents.length>0&&documents.every((doc)=>doc.category)

    const handleSaveDocuments=()=>{

        if(!isAllCategoriesSelected){
            setShowError(true);
            return;
        }
        else{
            setShowError(false);
        
            uploadDocument({documents,
                siteId:id});        }


    }
  

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload Documents
      </h2>
      
      
<div
  className="border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-cyan-900 transition flex flex-col items-center justify-center gap-3 text-center"
  onClick={() => fileInputRef.current.click()}
>
  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-900">
    <Upload size={28} />
  </div>

  <p className="font-medium text-gray-800">
    Click to upload files
  </p>

  <p className="text-sm text-gray-500">
   (Max 10MB each)
  </p>

  <input
    type="file"
    multiple
    onChange={handleFileChange}
    className="hidden"
    ref={fileInputRef}
  />
</div>
    

        {/**preview uploaded documents */}

        <div>
            <ul>
    {documents.map((doc)=>(
      
    <li
  key={doc.id}
  className="border border-gray-200 rounded-xl p-4 mb-3 flex flex-col gap-3"
>
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium text-gray-800 truncate">
      {doc.name}
    </p>
  </div>

  <select
    className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2
      ${
        !doc.category
          ? "border-red-400 focus:ring-red-300"
          : "border-gray-300 focus:ring-cyan-900"
      }`}
    required
    onChange={(e) => onCategoryChange(doc.id, e.target.value)}
  >
    <option value="">Select Category *</option>
    <option value="Contracts">Contracts</option>
    <option value="Drawings">Drawings</option>
    <option value="Bills And Invoices">Bills And Invoices</option>
    <option value="Permits">Permits</option>
    <option value="Photos">Photos</option>
    <option value="Others">Others</option>
  </select>
</li>

       
                
            ))}
            </ul>
         
        </div>
 {showError && (
  <p className="text-red-500 text-sm mt-2 text-center">
    Please select a category for all documents
  </p>
)}

  <div className="flex gap-3 mt-6">
  <button
    onClick={handleSaveDocuments}
    disabled={isUploading || isSuccess|| !isAllCategoriesSelected}
    className="w-full bg-cyan-950 text-white font-medium px-4 py-3 rounded-xl hover:bg-cyan-900 transition disabled:opacity-50"
  >
    {isUploading
      ? "Uploading..."
      : isSuccess
      ? "Upload Success"
      : "Upload"}
  </button>

  <button
    onClick={onClose}
    className="w-full bg-gray-100 text-gray-700 font-medium px-4 py-3 rounded-xl hover:bg-gray-200 transition"
  >
    Cancel
  </button>
</div>

    </ModalWrapper>
  );
};

export default UploadDocumentModal;
