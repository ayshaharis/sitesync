import { supabase } from "./supabaseClient";
import { uploadImages } from "./imageService";

// Fetching dailyupdates for a site
export const fetchDailyUpdates = async (site_id) => {
  const { data, error } = await supabase
    .from("dailyupdates")
    .select("*")
    .eq("site_id", site_id)
    .order("date", { ascending: false })
  if (error) throw error;
  return data;
};

// Adding week_number and year for weekly summary
function getWeekNumber(dateString) {
  const date = new Date(dateString);
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const weekNumber = 1 + Math.round(((target - firstThursday) / 86400000 - 3) / 7);
  return weekNumber;
}

// Saving daily updates WITH images
export const saveDailyUpdates = async (update, site_id, images = []) => {
  if (!update.date) throw new Error("Date is required");
  
  const dateObj = new Date(update.date);
  const week = getWeekNumber(dateObj);
  const year = dateObj.getFullYear();

  // Upload images first if any
  let imageUrls = [];
  if (images && images.length > 0) {
    console.log("Uploading images:", images);
    imageUrls = await uploadImages(site_id, images); 
    console.log("Uploaded image URLs:", imageUrls);
  }

  const { data, error } = await supabase
    .from("dailyupdates")
    .insert([
      {
        site_id: site_id,
        week_number: week,
        year: year,
          ...update,
        images: imageUrls,// Save image URLs
      
      }
    ])
    .select()
    .single();

  if (error) throw error;
  console.log("Saved update with images:", data);
  return data;
};

// Editing individual update with image support
export const editDailyUpdate = async (
  rowId,
  update,
  newImages = [],
  remainingImages = []
) => {
  console.log("Edit params:", { rowId, update, newImages, remainingImages });

  // STEP 1: Fetch existing record to get site_id
  const { data: existing, error: fetchError } = await supabase
    .from("dailyupdates")
    .select("*")
    .eq("id", rowId)
    .single();

  if (fetchError) throw fetchError;

  // STEP 2: Upload new images using existing.site_id
  let uploadedUrls = [];
  if (newImages.length > 0) {
    console.log("Uploading new images...");
    uploadedUrls = await uploadImages(existing.site_id, newImages); // Use existing.site_id
    console.log("Uploaded URLs:", uploadedUrls);
  }

  // STEP 3: Combine remaining + newly uploaded
  const finalImages = [...remainingImages, ...uploadedUrls];
  //derbugging
  console.log("Final images to save:", finalImages);
  console.log("Images payload size:", JSON.stringify(finalImages).length);


  // STEP 4: Update the record
const { data, error } = await supabase.rpc("update_daily_update", {
  p_id: rowId,
  p_date: update.date,
  p_workers: update.workers,
  p_worker_wage: update.worker_wage,
  p_expenses: update.expenses,
  p_description: update.description,
  p_summary: update.summary,
  p_images: finalImages
});

if (error) throw error;

console.log("Update successful via RPC:", data);
return data;

};



// Fetching dailyupdates by date
export const fetchSummaryByDate = async (fromDate, toDate, site_id) => {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw userError || new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("dailyupdates")
    .select("date,workers,worker_wage,expenses,description,summary")
    .eq("site_id", site_id)
    .gte("date", fromDate)
    .lte("date", toDate)
    .order("date", { ascending: false });
  if (error) throw error;
  return data;
};