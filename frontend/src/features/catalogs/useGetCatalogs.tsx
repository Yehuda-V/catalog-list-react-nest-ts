import { useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_ROUTE = import.meta.env.VITE_API_ROUTE;

const getCatalogs = async () => {
  const response = await fetch(`${BASE_URL}${API_ROUTE}`, {
    method: "GET",
  });
  return await response.json();
};

function useGetCatalogs() {
  const { isPending, isError, data, error, refetch, isSuccess, isRefetching } =
    useQuery({
      queryKey: ["catalogs"],
      queryFn: getCatalogs,
    });
  return { isPending, isError, data, error, refetch, isSuccess, isRefetching };
}

export { useGetCatalogs };
