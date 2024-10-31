import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as API from "@/constants/api";
import request from "@/services";

const uploadNomenclature = async (formData) => {
  await request.post(API.NOMENCLATURE_CSVUPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const searchNomenclature = async (query) => {
  const response = await request.get(`${API.NOMENCLATURE}?search=${query}`);
  return response.data;
};

export const useUploadNomenclature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadNomenclature,
    onSuccess: () => {
      queryClient.invalidateQueries("nomenclature");
      toast.success("успешно загружено", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSearchNomenclature = (query) => {
  return useQuery({
    queryKey: ["nomenclature", query],
    queryFn: () => searchNomenclature(query),
    enabled: !!query,
    onError: (error) => {
      console.error("There was an error searching the data!", error);
    },
  });
};
