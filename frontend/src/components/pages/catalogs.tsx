import {
  useCreateCatalog,
  useDeleteCatalog,
  useGetCatalogs,
  useUpdateCatalog,
} from "@/features";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Button,
  CatalogDialog,
} from "../index";

import { Badge } from "../ui/badge";
import { Catalog, Request } from "@/types/types";
import { useHandleResponse } from "@/lib/utils";

function Catalogs() {
  const {
    data: catalogsData,
    error: catalogsError,
    isPending: catalogsIsPending,
  } = useGetCatalogs();

  const catalogs = catalogsData?.catalogs || [];

  const deleteCatalogMutation = useDeleteCatalog();
  const createCatalogMutation = useCreateCatalog();
  const updateCatalogMutation = useUpdateCatalog();

  const handleResponse = useHandleResponse();

  const handleDelete = (id = 0) => {
    deleteCatalogMutation.mutate(id, {
      onSuccess: (data) => handleResponse("deleted", data),
      onError: (error) =>
        handleResponse("deleting", { status: "error", message: error.message }),
    });
  };

  const handleCreate = (props: Request) => {
    createCatalogMutation.mutate(props, {
      onSuccess: (data) => handleResponse("created", data),
      onError: (error) =>
        handleResponse("creating", { status: "error", message: error.message }),
    });
  };

  const handleUpdate = (props: Request) => {
    updateCatalogMutation.mutate(props, {
      onSuccess: (data) => handleResponse("updated", data),
      onError: (error) =>
        handleResponse("updating", { status: "error", message: error.message }),
    });
  };

  if (catalogsError)
    return <div>An error occurred: {catalogsError.message}</div>;

  return catalogsIsPending ? (
    <div>Catalogs are loading...</div>
  ) : (
    <>
      <div className="flex items-center justify-between py-4">
        <CatalogDialog mode="create" handleClick={handleCreate} />
      </div>
      <Table>
        <TableCaption className="font-medium">
          A catalog list of your products.
        </TableCaption>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="w-64">Name</TableHead>
            <TableHead>Vertical</TableHead>
            <TableHead>Primary</TableHead>
            <TableHead className="w-64">Locales</TableHead>
            <TableHead>Indexed At</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {catalogs.map((catalog: Catalog) => (
            <TableRow key={catalog.id} className="text-left">
              <TableCell className="font-light">{catalog.name}</TableCell>
              <TableCell>{catalog.vertical}</TableCell>

              <TableCell>
                {catalog.is_primary && (
                  <Badge className="bg-green-500" key={catalog.id}>
                    {"Primary"}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-4">
                  {catalog.locales.map((locale) => (
                    <Badge key={locale}>{locale}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{catalog.indexed_at}</TableCell>
              <TableCell>
                <CatalogDialog
                  mode="edit"
                  catalog={catalog}
                  handleClick={handleUpdate}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(catalog.id)}
                  disabled={
                    deleteCatalogMutation.isPending &&
                    deleteCatalogMutation.variables === catalog.id
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-bold">
            <TableCell className="text-left" colSpan={7}>
              {`Total of ${catalogs.length} catalogs`}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export { Catalogs };
