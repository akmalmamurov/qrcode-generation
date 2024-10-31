import request from "@/services";
import * as API from "@/constants/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteFunction = async ({ id, key }) => {
  await request.delete(`${API.DOMAIN_NAME}/${key}/${id}`);
};
const deleteData = (key) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteFunction({ id, key }),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      toast.success("успешно удаленно", { theme: "colored" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDelete = (key) => deleteData(key);
