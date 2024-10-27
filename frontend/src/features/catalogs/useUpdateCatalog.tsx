import { Request } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_ROUTE = import.meta.env.VITE_API_ROUTE;

const updateCatalog = async ({
  id,
  isPrimary,
  startIndexing,
  localesId,
}: Request) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      is_primary: isPrimary,
      start_indexing: startIndexing,
      local_codes: localesId,
    }),
  };
  const response = await fetch(`${BASE_URL}${API_ROUTE}/${id}`, options);
  if (!response.ok) {
    throw new Error("Failed to update catalog");
  }
  return await response.json();
};

function useUpdateCatalog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
    },
  });
}

export { useUpdateCatalog };
