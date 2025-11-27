import { supabase } from "./supaBaseClient";

export  const getSites=async()=>{
    const {data,error}=await supabase .from("sites")
.select("*").order("created_at",{ascending:false});
if(error) throw error;
return data;
}


export  const addSite=async(site)=>{
    const {data,error}=await supabase.from("sites").insert([site]).select().single();
    if(error) throw error;
return data;
}


//fetching site by id
export const getSiteById=async(id)=>{
    const {data,error}=await supabase.from("sites").select("*").eq("id",id).single();
    if(error) throw error;
    return data;
}

//editing site by id

export const updateSiteById=async(id)=>{

}