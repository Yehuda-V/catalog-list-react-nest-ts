import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import { MultiSelect } from "../select/LocalesSelect";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Modes, Verticals, type Dialog as DialogProps } from "@/types/types";
import { VerticalSelect } from "../select/VerticalSelect";

function CatalogDialog({
  mode = Modes.create,
  catalog,
  handleClick,
}: DialogProps) {
  const [id, setId] = useState<number>(catalog?.id || 0);
  const [name, setName] = useState(catalog?.name || "");
  const [vertical, setVertical] = useState<keyof typeof Verticals>(
    Verticals.general
  );
  const [isPrimary, setIsPrimary] = useState<boolean>(
    catalog?.is_primary || false
  );
  const [locales, setLocales] = useState<string[]>(catalog?.locales || []);
  const [startIndexing, setStartIndexing] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mode === Modes.edit) {
      setId(catalog?.id || 0);
      setVertical(catalog?.vertical || Verticals.general);
      setIsPrimary(catalog?.is_primary || false);
      setLocales(catalog?.locales || []);
    }
    return () => resetForm();
  }, [open, catalog, mode]);

  function handleSubmit() {
    if (mode === Modes.edit) {
      handleClick({
        id: id,
        isPrimary: isPrimary,
        startIndexing: startIndexing,
        localesId: locales,
      });
    } else if (mode === Modes.create) {
      handleClick({
        name: name,
        vertical: vertical,
        isPrimary: isPrimary,
        localesId: locales,
      });
    }
  }

  function resetForm() {
    setName("");
    setVertical(Verticals.general);
    setIsPrimary(false);
    setLocales([]);
    setStartIndexing(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === Modes.edit ? (
          <Button variant="outline">Edit</Button>
        ) : (
          <Button variant="default">
            <Plus className="h-4 w-4" /> Create
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {mode === Modes.edit ? "Edit catalog properties" : "Create catalog"}
          </DialogTitle>
          <DialogDescription>
            {mode === Modes.edit
              ? "Make changes to your catalog here. Click save when you're done."
              : "Create a new catalog. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        {mode === Modes.create && (
          <Input
            placeholder="Name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        )}
        {mode === Modes.create && (
          <VerticalSelect handleVerticalChange={setVertical} />
        )}

        <MultiSelect existingLocales={locales} setLocales={setLocales} />

        <div className="flex items-center space-x-6">
          <Switch
            id="isPrimary"
            checked={isPrimary}
            onCheckedChange={setIsPrimary}
          />
          <Label htmlFor="isPrimary">Is Primary</Label>
        </div>

        {mode === Modes.edit && (
          <div className="flex items-center space-x-6">
            <Switch
              id="Start_indexing"
              checked={startIndexing}
              onCheckedChange={(checked) => setStartIndexing(checked)}
            />
            <Label htmlFor="Start_indexing">Start indexing</Label>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CatalogDialog };
