import {supabase} from "./supabaseClient"


//fetching dailyupdates

export const fetchDailyUpdates=async(site_id)=>{
    const {data,error}=await 
    supabase.from("dailyupdates").select("*")
    .eq("site_id",site_id)
    .order("date",{ascending:false})
    if(error) throw error;
    return data;
}

//saving daily updates
export const saveDailyUpdates=async(update,site_id)=>{
    const {data,error}=await
     supabase.from("dailyupdates")
     .insert([{...update,site_id:site_id}])
     .select().single();
    if(error) throw error;
    return data;
}


//editing individual update. The id to be passed here is of inidvidual daily update row id and not site id also using upsert to update existing row 
export const editDailyUpdate = async (rowId, update) => {
  const { data, error } = await supabase
    .from("dailyupdates")
    .upsert({
      id: rowId,
      date: update.date,
      workers: update.workers,
      worker_wage: update.worker_wage,
      expenses: update.expenses,
      description: update.description,
      summary: update.summary
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
};