import request from "@/services";
import * as API from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

const fetchDataById = async (key, id) => {
  const response = await request.get(`${API.DOMAIN_NAME}/${key}/${id}`);
  return response.data;
};

const useFetchDataById = (key, id) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => fetchDataById(key, id),
    onError: (error) => {
      console.error("There was an error fetching the data!", error);
      toast.error("Error fetching data");
    },
  });
};

export default useFetchDataById;
