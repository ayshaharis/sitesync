import {supabase} from "./supabaseClient"


//fetching dailyupdates

export const fetchDailyUpdates=async(site_id)=>{
    const {data,error}=await 
    supabase.from("dailyupdates").select("*").eq("site_id",site_id)
    .order("date",{ascending:false})
    if(error) throw error;
    return data;
}


export const saveDailyUpdates=async(update,site_id)=>{
    const {data,error}=await
     supabase.from("dailyupdates")
     .insert([{...update,site_id:site_id}]).select().single();
    if(error) throw error;
    return data;
}