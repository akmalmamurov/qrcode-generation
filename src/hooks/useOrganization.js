import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as API from "@/constants/api";
import request from "@/services";



const searchOrganization = async (query) => {
  const response = await request.get(`${API.ORGANIZATION}?search=${query}`);
  return response.data;
};

export const useSearchOrganization = (query) => {
  return useQuery({
    queryKey: ["organizations", query],
    queryFn: () => searchOrganization(query),
    enabled: !!query,
    onError: (error) => {
      console.error("There was an error searching the data!", error);
    },
  });
};
