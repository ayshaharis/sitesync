

import { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";

const UploadDocumentModal=()=>{
    const [document,setDocument]=useState([]);


    const handleUpload=(e)=>{
        const file=e.target.files[0];
        if(!file)return;
        const newDoc={id:Date.now(),name:file.name}
        setDocument([...document,newDoc])

    }
    return(
       <ModalWrapper onClose={onClose}>
        <h2>Upload Documents</h2>
        <button onClick={handleUpload}>
    Upload Doc
        </button>
       </ModalWrapper>

    )
}
export default UploadDocumentModal;