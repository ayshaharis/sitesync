import {supabase} from "./supabaseClient"

export const fetchUserSites=async()=>{
    const {data:{user},error:userError}=await supabase
    .auth.getUser();

    if(userError||!user){
        console.log("User not autyhenticated");
        throw userError||new Error("User not authenticated");
    }
    console.log("fetching sites for user:",user.id);
    const {data,error}=await supabase.from("sites")
    .select("*")
    .eq("user_id",user.id)
    .order("created_at",{ascending:false});
    console.log("data from fetchusersites service",data)

    if(error) throw error;
    return data ||[];



}

//fetch single site with pownership check

export const fetchSiteById=async(siteId)=>{
    const{data:{user},error:userError}=await supabase
    .auth.getUser();
    if(userError||!user){
        console.log("User not authenticated");
        throw userError||new Error("User not authenticated");
    }   

    const {data,error}=await supabase.from("sites")
    .select("*")
    .eq("id",siteId)
    .eq("user_id",user.id)
    .single();
      console.log("data from fetchusersites  by site id service",data)
    if(error) throw error;
 

    if(!data){
        throw new Error("Site not found or access denied"); 
    }
    return data;
}

//create new site and automatically add user_id fro that site 


export const createSite=async(siteData)=>{
    const{data:{user},error:userError}=await supabase
    .auth.getUser();
    if(!user || userError){
        console.log("User not authenticated");
        throw userError||new Error("User not authenticated");
    }
    const {data,error}= await supabase.from("sites")
.insert([{...siteData,user_id:user.id}])
.select().single();

    if(error) throw error;
    return data;
}


export const updateSite = async (siteId, updates) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
console.log("Update payload:", updates);

  if (!user || userError) {
    throw new Error("User not authenticated");
  }
    const { data: existing, error: fetchError } = await supabase
      .from("sites")
      .select("*")
      .eq("id", siteId)
      .single();
  
    if (fetchError) {
      console.error("Error fetching existing record:", fetchError);
      throw fetchError;
    }
  
    console.log("Existing record:", existing);

  const { data, error } = await supabase.rpc("update_site", {
    p_id: siteId,
    p_name: updates.name,
    p_location: updates.location,
    p_status: updates.status,
    p_owner_name: updates.owner_name,
    p_contact: updates.contact,
    p_budget: updates.budget,
    p_notes: updates.notes,
    p_start_date: updates.start_date,
    p_end_date: updates.end_date
  });

  if (error) throw error;

  return data;
};





    export const deleteSiteById=async(siteId)=>{
        const {data:{user},error:userError}=await supabase.auth.getUser();
        if(!user||userError)
            throw userError;
        const{error}=await supabase.from("sites")
        .delete()
    
        . eq("id",siteId)
        .eq("user_id",user.id);

        if(error){
            console.log("error deleting site",siteId);
            throw error;
        }
        return true;
    }
    
//fetch number of active sites yo display on dahsboard

export const fetchActiveSites = async () => {

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  // Fetch ONLY count
  const { count, error } = await supabase
    .from("sites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "In Progress");

  if (error) throw error;

  return count; 
};