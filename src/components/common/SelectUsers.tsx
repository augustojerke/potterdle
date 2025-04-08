"use client";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { useUsers } from "@/app/actions/user-actions";

interface SelectUsersProps {
  onChange: (userId: string) => void;
}

function getUserRank(points: number) {
  if (points >= 100) {
    return { rank: "Dark Lord", color: "bg-black text-white" };
  } else if (points >= 80) {
    return { rank: "Minister of Magic", color: "bg-purple-700 text-white" };
  } else if (points >= 60) {
    return { rank: "Professor", color: "bg-indigo-600 text-white" };
  } else if (points >= 40) {
    return { rank: "Wizard", color: "bg-blue-600 text-white" };
  } else if (points >= 20) {
    return { rank: "Apprentice", color: "bg-green-500 text-white" };
  } else {
    return { rank: "Muggle", color: "bg-gray-500 text-white" };
  }
}

export function SelectUsers({ onChange }: SelectUsersProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const { data: users = [], isLoading } = useUsers();

  const filteredUsers = users.filter((user: User) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const selectedUser = users.find((user: User) => user.id === selected);

  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-1/2 h-8 justify-between px-6 py-4 text-sm"
        >
          {selectedUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{selectedUser.username}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  getUserRank(selectedUser.points).color
                }`}
              >
                {getUserRank(selectedUser.points).rank}
              </span>
            </div>
          ) : (
            "Select a user..."
          )}
          <ChevronsUpDown className="ml-2 h-6 w-6 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0 text-sm">
        <Command>
          <CommandInput
            placeholder="Search user..."
            className="p-3 text-sm"
            onValueChange={setQuery}
          />
          <CommandGroup className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                <CommandItem
                  onSelect={() => {
                    setSelected(null);
                    setOpen(false);
                    onChange("");
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-sm"
                >
                  <Check
                    className={`h-5 w-5 text-sm ${
                      selected === null ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  Clear
                </CommandItem>

                {filteredUsers.map((user: User) => {
                  const { rank, color } = getUserRank(user.points);
                  return (
                    <CommandItem
                      key={user.id}
                      value={user.username}
                      onSelect={() => {
                        setSelected(user.id);
                        setOpen(false);
                        onChange(user.id);
                      }}
                      className="flex items-center gap-3 px-3 py-2 text-sm"
                    >
                      <Check
                        className={`h-5 w-5 ${
                          selected === user.id ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm">
                          {user.username}
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}
                          >
                            {rank}
                          </span>
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
