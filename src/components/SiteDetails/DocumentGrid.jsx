import DocumentCard from "./DocumentCard";
import {  useState } from "react";
import { useDocuments } from "../../hooks/useDocumentUpload";
import { useParams } from "react-router-dom";
import { FileText } from 'lucide-react';
const DocumentGrid=()=>{
    const {id}=useParams();
    const {data:documents=[],isLoading,isError}=useDocuments(id);
    console.log("documents",documents);
    const [activeCategory,setActiveCategory]=useState("All Documents");
    const categories=[
        "All Documents",
        "Contracts",
        "Drawings",
        "Bills And Invoices",
        "Permits",
        "Photos",
        "Others"
    ];
 

    if(isLoading){
        return <div>Loading documents...</div>
    }
    if(isError){
        return <div>Error loading documents.</div>
    }
        const filteredDocuments=
        activeCategory==="All Documents"?documents:documents.filter((doc)=>doc.category===activeCategory)

    return(
        <div className="bg-white rouded-2xl shadow-sm border border-gray-200 p-6 ">
            Documents <FileText className="inline-block ml-2 mb-1"/>
            <div className="">
                 <div>
                      <ul  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                    {categories.map((cat,index)=>(
                      
                            <li 
                            key={index}
                            onClick={()=>setActiveCategory(cat)}
                            className="border border-gray-200 rounded-xl p-2">{cat} ({cat==="All Documents"?filteredDocuments.length:filteredDocuments.filter((doc)=>doc.category===cat).length})</li>
                  
                      

                    ))}
                          </ul>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                    {filteredDocuments.map((document,index)=>(    
                        <div >
                          <DocumentCard key={index} document={document}/>

                            </div>   
                    ))}
                   
                 </div>

            </div>
       </div>
    )
}


export default DocumentGrid;