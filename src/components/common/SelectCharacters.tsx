"use client";
import { useEffect, useState } from "react";
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
import charactersData from "@/app/data/characters.json";

const characters: Character[] = charactersData;

interface SelectCharactersProps {
  onChange: (characterId: string) => void;
}

export function SelectCharacters({ onChange }: SelectCharactersProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-20 justify-between px-6 py-4 text-lg"
        >
          {selected ? (
            <div className="flex items-center gap-4">
              <img
                src={characters.find((opt) => opt.id === selected)?.image}
                alt="Character"
                className="w-12 h-12 rounded-full"
              />
              {characters.find((opt) => opt.id === selected)?.name}
            </div>
          ) : (
            "Select a character..."
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
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-14 h-14 rounded-full"
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
