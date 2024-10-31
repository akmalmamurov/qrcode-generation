import request from "@/services";
import * as API from "@/constants/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const approveUser = async (id) => {
  await request.post(`${API.APPROVE_USER}`, {
    user_id: id,
  });
};

export const useApproveUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveUser,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("успешно удаленно", { theme: "colored" });
    },
  });
};
