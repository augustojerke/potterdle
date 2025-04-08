import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export async function createUser(values: User) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    return await res.json();
  } catch (e: any) {
    console.log(e.message);
  }
}

async function getUsers() {
  try {
    const res = await fetch("/api/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const users = await res.json();
    return users.users;
  } catch (e: any) {
    console.log(e.message);
  }
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });
}
