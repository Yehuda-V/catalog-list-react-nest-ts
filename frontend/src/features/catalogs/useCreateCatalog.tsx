import { vertical_map } from "@/lib/utils";
import { Request } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_ROUTE = import.meta.env.VITE_API_ROUTE;

const createCatalog = async ({
  name,
  vertical,
  isPrimary,
  localesId,
}: Request) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      vertical_id: vertical_map[vertical as keyof typeof vertical_map],
      is_primary: isPrimary,
      local_codes: localesId,
    }),
  };
  const response = await fetch(`${BASE_URL}${API_ROUTE}`, options);
  if (!response.ok) {
    throw new Error("Failed to create catalog");
  }
  return await response.json();
};

function useCreateCatalog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
    },
    onError: (error) => {
      console.error("Error creating catalog:", error);
    },
  });
}

export { useCreateCatalog };
