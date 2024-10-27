import { useToast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const vertical_map = {
  general: 1,
  fashion: 2,
  home: 3,
};

 const useHandleResponse = () => {
  const { toast } = useToast();

  const handleResponse = (operation: string, result: { status: string; message?: string }) => {
    if (result.status === "error") {
      console.error(`Error ${operation} catalog:`, result.message);
      toast({
        title: `Error ${operation} catalog`,
        description: result.message || `Error ${operation} catalog`,
        variant: "destructive",
      });
    } else {
      console.log(`Catalog ${operation} successfully`);
      toast({
        title: `Catalog ${operation} successfully`,
        description: `Catalog ${operation} successfully`,
        variant: "default",
      });
    }
  };

  return handleResponse;
};



export { vertical_map, useHandleResponse };
