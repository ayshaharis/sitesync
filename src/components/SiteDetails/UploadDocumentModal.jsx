import {  useRef, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { useDocumentUpload } from "../../hooks/useDocumentUpload";
import {Upload} from "lucide-react";
import { useParams } from "react-router-dom";
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
      
      
      <div className="border border-gray-300 rounded-lg p-6 cursor-pointer">
     <span className=""
     onClick={()=>fileInputRef.current.click()}>
   <Upload size={35}/> 
   Click here to upload documents
   </span>


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
      
            <li key={doc.id} className="border border-gray-200 rounded-lg p-2 m-2">
            {doc.name}
            <select className="m-2 p-2" required onChange={(e)=>onCategoryChange(doc.id,e.target.value)} >
                <option value="">Select Category</option>
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
        <p className="text-red-500 text-sm">{showError&&"Please select category for all documents"}</p>

      <div className="flex gap-3 m-2 p-2">
        <button
        onClick={handleSaveDocuments}
          className="w-full bg-cyan-950 text-white font-medium px-4 py-3 rounded-xl hover:bg-gray-800 transition" 
           >
      {isUploading?"Uploading...":"Upload"}  
      {isSuccess && !isUploading ? "Uploaded Successfully" : ""}
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-black font-medium px-4 py-3 rounded-xl hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default UploadDocumentModal;
