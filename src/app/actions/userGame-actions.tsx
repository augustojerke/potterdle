import { useMutation, useQuery } from "@tanstack/react-query";

async function getUserGames() {
  const res = await fetch("/api/userGame");
  if (!res.ok) {
    throw new Error("Erro na busca de UserGame");
  }
  return res.json();
}

async function getUserGameById(id: number) {
  const res = await fetch(`/api/userGame/${id}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar UserGame por ID");
  }
  return res.json();
}

async function updateUserGame(data: any) {
  const res = await fetch("/api/userGame");
  if (!res.ok || !data.sucesso) {
    throw new Error("Erro na busca de UserGame");
  }
  return res.json();
}

export function useUserGame() {
  return useQuery({
    queryKey: ["userGames"],
    queryFn: getUserGames,
    refetchOnWindowFocus: false,
  });
}

export function useUserGameById(id: number) {
  return useQuery({
    queryKey: ["userGame", id],
    queryFn: () => getUserGameById(id),
    enabled: !!id,
  });
}

export function useUpdateUserGame() {
  return useMutation({
    mutationFn: (data) => updateUserGame(data),
  });
}

export function useCreateUserGame() {
  return useMutation({
    mutationFn: (data) => createUserGame(data),
  });
}

async function createUserGame(data: any) {
  const res = await fetch("/api/UserGame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Erro ao criar UserGame");
  }
  return res.json();
}

export function useDeleteUserGame() {
  return useMutation({
    mutationFn: (data: any) => deleteUserGame(data.id),
  });
}

async function deleteUserGame(id: number) {
  const res = await fetch(`/api/userGame/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao deletar UserGame");
  }
  return res.json();
}
