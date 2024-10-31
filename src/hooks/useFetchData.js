import request from "@/services";
import * as API from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
const fetchData = async ({ key, page }) => {
  const response = await request.get(
    page !== undefined
      ? `${API.DOMAIN_NAME}/${key}?page=${page}&limit=${API.LIMIT}`
      : `${API.DOMAIN_NAME}/${key}`,
  );
  return response.data;
};

const useData = (key, page) => {
  return useQuery({
    queryKey: [key, page],
    queryFn: () => fetchData({ key, page }),
    onError: (error) => {
      console.error("There was an error fetching the data!", error);
      toast.error("Error fetching data");
    },
  });
};

export const useFetchData = (key, page) => useData(key, page);

