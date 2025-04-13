"use client";
import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateUser } from "@/app/actions/user-actions";
import { useRouter } from "next/navigation";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  currentName: string;
  currentHouse: string;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  currentName,
  currentHouse,
}: EditProfileDialogProps) {
  const queryClient = useQueryClient();

  const [name, setName] = useState(currentName ?? "");
  const [house, setHouse] = useState(currentHouse ?? "");
  const router = useRouter();

  useEffect(() => {
    setName(currentName ?? "");
    setHouse(currentHouse ?? "");
  }, [currentName, currentHouse]);

  async function handleEditProfile() {
    try {
      await updateUser({ name, house });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      router.refresh();
      onOpenChange(false);
    } catch (e) {
      console.error("Erro ao editar perfil:", e);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Change your wizard name and your house
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              placeholder="Write your new name"
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="house" className="text-right">
              House
            </Label>
            <div className="col-span-3">
              <Select value={house} onValueChange={setHouse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your new house" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gryffindor">Gryffindor</SelectItem>
                  <SelectItem value="Ravenclaw">Ravenclaw</SelectItem>
                  <SelectItem value="Hufflepuff">Hufflepuff</SelectItem>
                  <SelectItem value="Slytherin">Slytherin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
          <Button variant="secondary" onClick={handleEditProfile}>
            <Pencil />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
