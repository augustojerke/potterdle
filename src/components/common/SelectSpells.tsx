"use client";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import spellsData from "@/app/data/spells.json";

const spells: Spell[] = spellsData;

interface SelectSpellsProps {
  onChange: (spellId: string) => void;
}

export function SelectSpells({ onChange }: SelectSpellsProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filteredCharacters = spells.filter((char) =>
    char.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-1/2 h-18 justify-between px-6 py-4 text-lg"
        >
          {selected ? (
            <div className="flex items-center gap-4">
              {spells.find((opt) => opt.id === selected)?.name}
            </div>
          ) : (
            "Select a spell..."
          )}
          <ChevronsUpDown className="ml-2 h-6 w-6 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search character..."
            className="p-3 text-lg"
            onValueChange={setQuery}
          />
          <CommandGroup className="max-h-[400px] overflow-y-auto">
            {filteredCharacters.map((option) => (
              <CommandItem
                key={option.id}
                value={option.name}
                onSelect={() => {
                  setSelected(option.id);
                  setOpen(false);
                  onChange(option.id);
                }}
                className="flex items-center gap-4 px-5 py-3 text-lg"
              >
                <Check
                  className={`h-5 w-5 ${
                    selected === option.id ? "opacity-100" : "opacity-0"
                  }`}
                />
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
