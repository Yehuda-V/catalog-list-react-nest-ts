import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_ROUTE = import.meta.env.VITE_API_ROUTE;

const deleteCatalog = async (id: number) => {
  const options = { method: "DELETE" };
  const response = await fetch(`${BASE_URL}${API_ROUTE}/${id}`, options);
  if (!response.ok) {
    throw new Error("Failed to delete catalog");
  }
  return await response.json();
};

function useDeleteCatalog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
    },
  });
}

export { useDeleteCatalog };
