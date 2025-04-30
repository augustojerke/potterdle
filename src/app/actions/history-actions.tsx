import { useQuery } from "@tanstack/react-query";

async function getHistory() {
  try {
    const res = await fetch("/api/history", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const history = await res.json();
    return history.history;
  } catch (e: any) {
    console.log(e.message);
  }
}

export function useHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
    refetchOnWindowFocus: false,
    refetchInterval: 10000,
  });
}
