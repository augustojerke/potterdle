import { useMutation, useQuery } from "@tanstack/react-query";

async function getChallenges() {
  const res = await fetch("/api/challenge");
  if (!res.ok) {
    throw new Error("Erro na busca de Challenges");
  }
  return res.json();
}

async function getChallengeById(id: number) {
  const res = await fetch(`/api/challenge/${id}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar Challenge por ID");
  }
  return res.json();
}

async function updateChallenge(data: any) {
  const res = await fetch("/api/challenge");
  if (!res.ok || !data.sucesso) {
    throw new Error("Erro na busca de Challenges");
  }
  return res.json();
}

export function useChallenges() {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
    refetchOnWindowFocus: false,
  });
}

export function useChallengeById(id: number) {
  return useQuery({
    queryKey: ["challenge", id],
    queryFn: () => getChallengeById(id),
    enabled: !!id,
  });
}

export function useUpdateChallenge() {
  return useMutation({
    mutationFn: (data) => updateChallenge(data),
  });
}

export function useCreateChallenge() {
  return useMutation({
    mutationFn: (data) => createChallenge(data),
  });
}

async function createChallenge(data: any) {
  const res = await fetch("/api/challenge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Erro ao criar Challenge");
  }
  return res.json();
}

export function useDeleteChallenge() {
  return useMutation({
    mutationFn: (data: any) => deleteChallenge(data.id),
  });
}

async function deleteChallenge(id: number) {
  const res = await fetch(`/api/challenge/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Erro ao deletar Challenge");
  }
  return res.json();
}
