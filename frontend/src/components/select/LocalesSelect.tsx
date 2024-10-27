import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import { local_list } from "@/data/locales";

function MultiSelect({
  existingLocales,
  setLocales,
}: {
  existingLocales: string[];
  setLocales: (locales: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([
    ...new Set(existingLocales),
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setLocales(selected);
  }, [selected, setLocales]);

  const handleSelect = useCallback((currentLocal: string) => {
    setInputValue("");
    setSelected((prev) => [...prev, currentLocal]);
  }, []);

  const handleUnselect = useCallback((locale: string) => {
    setSelected((prev) => prev.filter((s) => s !== locale));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }

      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = [...new Set(local_list)].filter(
    (locale) => !selected.includes(locale)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((locale) => {
            return (
              <Badge key={locale} variant="secondary">
                {locale}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(locale);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(locale)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select locales..."
            className="ml-1 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full h-48 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((currentLocal) => {
                  return (
                    <CommandItem
                      key={currentLocal}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => handleSelect(currentLocal)}
                      className={"cursor-pointer"}
                    >
                      {currentLocal}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

export { MultiSelect };
