import {supabase} from "./supabaseClient"
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

export const updateSiteById=async(updates,id)=>{
    console.log("Updating site with id:", id, "with updates:", updates);
    const {data,error}=await supabase.from("sites")
    .upsert({
      id: id,
      name: updates.name,
      location: updates.location,
      client: updates.client,
      status: updates.status,
      budget: updates.budget,
      start_date: updates.start_date,
      end_date: updates.end_date
    })
    .select()
    .single();
    
    console.log("Update response data:", data, "error:", error);
    if(error) throw error;
    return data;

}