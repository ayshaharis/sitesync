import DocumentCard from "./DocumentCard";
import { useState } from "react";
const DocumentGrid=()=>{
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

    const documents=[
        {id:1,name:"siteplan.pdf",date:"2023-10-01",category:"Drawings"},
        {id:2,name:"contract.docx",date:"2023-10-05",category:"Contracts"},
        {id:3,name:"invoice1.pdf",date:"2023-10-10",category:"Bills And Invoices"},
        {id:4,name:"drawing1.dwg",date:"2023-10-12",category:"Drawings"},
        {id:5,name:"permit.pdf",date:"2023-10-15",category:"Permits"},
    ];

    const filteredDocuments=activeCategory==="All Documents"?documents:documents.filter((doc)=>doc.category===activeCategory)
    
    return(
        <div className="bg-white rouded-2xl shadow-sm border border-gray-200 p-6 ">
            Documents
            <div className="">
                 <div>
                      <ul  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                    {categories.map((cat,index)=>(
                      
                            <li 
                            key={index}
                            onClick={()=>setActiveCategory(cat)}
                            className="border border-gray-200 rounded-xl p-2">{cat}(10)</li>
                  
                      

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