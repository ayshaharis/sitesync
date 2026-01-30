
import { supabase } from "./supabaseClient";
 export const documentUploadService =async(documents,siteId)=>{
    console.log("documentUploadService called with documents:",documents,"siteId from service:",siteId);
if(!documents || documents.length===0) return [];

const rowsToInsert=[];
//for each document upload to supabase storage
for(const document of documents){
    //get a file name for the document
    const fileExt=document.name.split('.').pop();
    const fileName=`${siteId}/${document.category}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
 
//upload to supabase storage
const {error:uploadError}=await supabase.storage
.from('site-documents')
.upload(fileName,document.file,{
    cacheControl:'3600',
    upsert:false
});

if(uploadError) throw uploadError;
//if upload success ?get public url
const {data:{publicUrl}}=supabase.storage
.from('site-documents')
.getPublicUrl(fileName);

//prepare row to insert in documents table
rowsToInsert.push({
    site_id:siteId,
    file_name:document.name,
    file_type:document.type,
    category:document.category,
    file_url:publicUrl,
});



}
console.log("Rows to insert into documents table:",rowsToInsert);
const {data,error}=await supabase.from('documents')
    .insert(rowsToInsert).select();
if(error) throw error;
return data;





 }
export default documentUploadService;