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


//editing individual update. The id to be passed here is of inidvidual daily update row id and not site id also using rpc to bypass cors to update existing row 
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
  const { data, error } = await supabase.rpc('update_daily_update', {
    p_id: rowId,
    p_date: update.date,
    p_workers: update.workers,
    p_worker_wage: update.worker_wage,
    p_expenses: update.expenses,
    p_description: update.description,
    p_summary: update.summary
  });

  if (error) {
    console.error("RPC error:", error);
    throw error;
  }

  console.log("Update successful:", data);
  return data;
};







/**budget
: 
100000
contact
: 
8985565689
created_at
: 
"2025-12-05T10:13:14.458111"
end_date
: 
"2026-01-28"
id
: 
"169b0ab4-a807-4e90-87bb-5ca5ec792f4e"
location
: 
"kerala"
name
: 
"site1"
notes
: 
"construction"
owner_name
: 
"owner"
start_date
: 
"2025-12-05"
status
: 
"In Progress"
user_id
: 
"a19f5e9d-7fa6-4be6-b29e-0f671740b855" */