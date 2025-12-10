import {supabase} from "./supabaseClient"


//fetching dailyupdates but limiting to 10 updates in UI

export const fetchDailyUpdates=async(site_id)=>{
    const {data,error}=await 
    supabase.from("dailyupdates").select("*")
    .eq("site_id",site_id)
    .order("date",{ascending:false})
    .limit(7)
    if(error) throw error;
    return data;
}
  //adding week_number and year for weekly summary

function getWeekNumber(dateString) {
  const date = new Date(dateString);
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const weekNumber = 1 + Math.round(((target - firstThursday) / 86400000 - 3) / 7);
  return weekNumber;
}


//saving daily updates
export const saveDailyUpdates=async(update,site_id)=>{
  if(!update.date) throw new Error("Date is required");
  const dateObj=new Date(update.date);
  const week=getWeekNumber(dateObj);
  const year=dateObj.getFullYear();

    const {data,error}=await
     supabase.from("dailyupdates")
     .insert([{site_id:site_id,week_number:week,year:year,...update}])
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






//fetching dailyuopdates by date
export const fetchSummaryByDate=async(fromDate,toDate,site_id)=>{
    const{data:user,error:userError}=await supabase.auth.getUser();
    if(userError||!user){
        throw userError||new Error("User not authenticated");
    }


    const {data,error}=await supabase
    .from("dailyupdates")
    .select("date,workers,worker_wage,expenses,description,summary")
    .eq("site_id",site_id)
    .gte("date",fromDate)
    .lte("date",toDate)
    .order("date",{ascending:false});
    if(error) throw error;
    return data;
}