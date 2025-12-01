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


export const updateSite=async(siteId,updates)=>{
    const{data:{user},error:userError}=await supabase
    .auth.getUser();
    if(!user || userError){
        console.log("User not authenticated");
        throw error||new Error("User not authenticated");
    }

    const {data,error}=await supabase.from("sites")
    .update({

        name:updates.name,
        location:updates.location,
        status:updates.status,
        owner_name:updates.owner_name,
        contact:updates.contact,
        budget:updates.budget,
        notes:updates.notes,
        start_date:updates.start_date,
        end_date:updates.end_date
    })
    .eq("id",siteId)
    .eq("user_id",user.id)
    .select()
    .single();

    if(error) throw error;
    return data;
    }


    //delete site by id with ownership check
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
    
