import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserSites, createSite, updateSite, deleteSiteById, fetchSiteById } from '../services/sitesService';

// Fetch user sites
export const useUserSites = () => {
  return useQuery({
    queryKey: ['sites'],
    queryFn: fetchUserSites,
    staleTime: 30000
  });
};

// Fetch single site
export const useSite = (siteId) => {
  return useQuery({
    queryKey: ['site', siteId],
    queryFn: () => fetchSiteById(siteId),
    enabled: !!siteId
  });
};

// Create site
export const useCreateSite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSite,
    onSuccess: () => {
      queryClient.invalidateQueries(['sites']);
    }
  });
};

// Update site
export const useUpdateSite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ siteId, updates }) => {
  return updateSite(siteId, updates)
    },
        
    onSuccess: () => {
      queryClient.invalidateQueries(['sites']);
    }
  });
};

// Delete site
export const useDeleteSiteById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSiteById,
    onSuccess: () => {
      queryClient.invalidateQueries(['sites']);
    }
  });
};