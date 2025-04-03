import { User } from "@prisma/client";

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
