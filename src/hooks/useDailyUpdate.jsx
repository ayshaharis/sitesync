import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDailyUpdates, saveDailyUpdates,editDailyUpdate } from "../services/dailyUpdatesService";

export const useDailyUpdate = (siteId,update) => {
  return useQuery({
    queryKey: ["dailyUpdates", siteId],
    queryFn: () => fetchDailyUpdates(siteId),
  });
};

export const useSaveDailyUpdate = (siteId) => {
  const queryClient = useQueryClient();  

  return useMutation({
    mutationFn: (update) => saveDailyUpdates(update, siteId), // update comes here
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
    mutationFn: ({ rowId, updatedData  }) => {
      console.log("Editing row:", rowId, "with data:", updatedData);
      return   editDailyUpdate(rowId, updatedData);
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