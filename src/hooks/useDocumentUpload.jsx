import documentUploadService from "../services/documentUploadService";
import { useMutation,useQueryClient,useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabaseClient";


//mutation hook for document upload
export const useDocumentUpload = () => {
    const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ documents, siteId }) => {
      return documentUploadService(documents, siteId);
    },
    onSuccess:(_,variables)=>{
        queryClient.invalidateQueries({
            queryKey:['documents',variables.siteId]
        })
    }
  });

  return {
    uploadDocument: mutation.mutate,
    isUploading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

//documents fetch hook
export const useDocuments=(siteId)=>{
    return useQuery({
        queryKey:['documents',siteId],

        queryFn:async()=>{
            const {data,error}=await supabase.from('documents')
            .select("*")
            .eq('site_id',siteId)
            .order('created_at',{ascending:false});
            if(error) throw error;
            console.log("data from useDocuments hook",data);
            return data;
        },
        enabled:!!siteId
    })
}