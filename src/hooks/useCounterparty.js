import request from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "@/constants/api";
import { toast } from "react-toastify";

const getCounterInfoWithInn = async (inn) => {
  const response = await request.get(`${API.COUNTERPARTY}/parse/${inn}`);
  return response.data;
};

export const usegetCounterInfoWithInn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getCounterInfoWithInn,
    onSuccess: () => {
      queryClient.invalidateQueries("counterparty");
      toast.success("успешно получать", { theme: "colored" });
    },
  });
};
