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
  console.log("Updating row ID:", rowId, "with data:", update);

  // First, verify the record exists and get current data
  const { data: existing, error: fetchError } = await supabase
    .from("dailyupdates")
    .select("*")
    .eq("id", rowId)
    .single();

  if (fetchError) {
    console.error("Error fetching existing record:", fetchError);
    throw fetchError;
  }

  console.log("Existing record:", existing);

  // Now update with all required fields
  const { data, error } = await supabase
    .from("dailyupdates")
    .update({
      date: update.date || existing.date,
      workers: update.workers ?? existing.workers,
      worker_wage: update.worker_wage ?? existing.worker_wage,
      expenses: update.expenses ?? existing.expenses,
      description: update.description || existing.description,
      summary: update.summary || existing.summary
    })
    .eq("id", rowId)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw error;
  }

  console.log("Update successful:", data);
  return data;
};