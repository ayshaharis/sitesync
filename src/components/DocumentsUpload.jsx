import { useState } from "react";

const DocumentsUpload=()=>{
   const [document,setDocument]=useState([]);


    const handleUpload=(e)=>{
        const file=e.target.files[0];
        if(!file)return;
        const newDoc={id:Date.now(),name:file.name}
        setDocument([...document,newDoc])

    }
    return(
        <div className="p-4 border rounded shadow-sm bg-white mb-6">
            <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold"> 
                Documents
             </h3>
             <label className="cursor-pointer text-blue-600 hover:underline">[+upload]
             <input type="file"  className="hidden"  onChange={handleUpload}/>
             </label>

            </div>
            <div className="divide-y divide-gray-200">
           {document.length>0?(
            document.map((doc)=>(
                <p key={doc.id} className="py-1">{doc.name}</p>
            ))
           ):(
                <p className="text-gray-500 italic">No docs uploaded</p>
            )}
            </div>
           
        </div>
    )
}

export default DocumentsUpload;