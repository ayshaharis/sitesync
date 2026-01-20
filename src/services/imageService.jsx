import { supabase } from "./supabaseClient";

export const uploadImages = async (siteId, images) => {
  if (!images || images.length === 0) return [];

  const uploadedUrls = [];

  for (const image of images) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${siteId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('site-images')
      .upload(fileName, image, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(fileName);

    uploadedUrls.push(publicUrl);
  }

  return uploadedUrls;
};

export const deleteImage = async (imageUrl) => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/site-images/');
    if (urlParts.length < 2) return;
    
    const path = urlParts[1];
    
    const { error } = await supabase.storage
      .from('site-images')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};