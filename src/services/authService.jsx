import { supabase } from "./supabaseClient";

export const signUp = async ( full_name, email, password, role ) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name:full_name,
        role:role||'user',
      }
    }
  });

  if (error) throw error;

  console.log("Auth data:", data);
  return data;
};




export const signIn=async (email,password)=>{
    const{data,error}=await supabase.auth.signInWithPassword({
        email,password,
    });
    if(error) throw error;
    return data;
}       
export const signOut=async()=>{
    const {error}= await supabase.auth.signOut();
    if(error) throw error;
}


export const getCurrentUser=async()=>{
    const {data,error}=await supabase.auth.getUser();
    if(error) throw error;
    return data.user;
}