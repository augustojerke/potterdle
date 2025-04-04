import { useMutation, useQuery } from "@tanstack/react-query";

async function getGames() {
  const res = await fetch("/api/game");
  if (!res.ok) {
    throw new Error("Erro na busca de games");
  }
  return res.json();
}

async function getGameById(id: number) {
  const res = await fetch(`/api/game/${id}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar game por ID");
  }
  return res.json();
}

async function updateGame(data: any) {
  const res = await fetch("/api/game");
  if (!res.ok || !data.sucesso) {
    throw new Error("Erro na busca de games");
  }
  return res.json();
}

export function useGames() {
  return useQuery({
    queryKey: ["games"],
    queryFn: getGames,
    refetchOnWindowFocus: false,
  });
}

export function useGameById(id: number) {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(id),
    enabled: !!id, // Só busca se o ID for válido
  });
}

export function useUpdateGame() {
  return useMutation({
    mutationFn: (data) => updateGame(data),
  });
}

export function useCreateGame() {
  return useMutation({
    mutationFn: (data) => createGame(data),
  });
}

async function createGame(data: any) {
  const res = await fetch("/api/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Erro ao criar game");
  }
  return res.json();
}

export function useDeleteGame() {
  return useMutation({
    mutationFn: (data: any) => deleteGame(data.id),
  });
}

async function deleteGame(id: number) {
  const res = await fetch(`/api/game/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao deletar game");
  }
  return res.json();
}
