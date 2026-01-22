import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDailyUpdates, saveDailyUpdates,editDailyUpdate } from "../services/dailyUpdatesService";

export const useDailyUpdate = (siteId) => {
  return useQuery({
    queryKey: ["dailyUpdates", siteId],
    queryFn: () => fetchDailyUpdates(siteId),
    enabled: !!siteId, // only run if siteId is available
  });
};

export const useSaveDailyUpdate = (siteId) => {
  const queryClient = useQueryClient();  

  return useMutation({
    mutationFn: ({data,selectedImages}) =>
       saveDailyUpdates(data, siteId,selectedImages), // update comes here
    onSuccess: () => {
      queryClient.invalidateQueries(["dailyUpdates", siteId]); // refresh list
    },
    onError: (error) => {
      console.error("Error saving daily update:", error);
    }
  });
};


export const useEditDailyUpdate = (siteId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rowId, updatedData ,selectedImages ,remainingImages}) => {
      console.log("Editing row:", rowId, "with data:", updatedData);
      return   editDailyUpdate(rowId, updatedData,selectedImages,remainingImages);
    },
    

    onSuccess: () => {
      queryClient.invalidateQueries(["dailyUpdates"]);
      queryClient.invalidateQueries(["dailyUpdates", siteId]);
    },
    onError: (error) => {
      console.error("Error editing daily update:", error);
    }
  });
};