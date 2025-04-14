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
    refetchInterval: 10000,
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

async function declineChallenge(data: any) {
  const res = await fetch(`/api/challenge/decline`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Erro ao deletar Challenge");
  }
  return res.json();
}

export function useDeclineChallenge() {
  return useMutation({
    mutationFn: (data: any) => declineChallenge(data),
  });
}

async function surrenderChallenge(data: any) {
  const res = await fetch(`/api/challenge/surrender`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Erro ao desistir do Challenge");
  }
  return res.json();
}

export function useSurrenderChallenge() {
  return useMutation({
    mutationFn: (data: any) => surrenderChallenge(data),
  });
}

async function finishChallenge(data: any) {
  const res = await fetch(`/api/challenge/finish`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Erro ao finalizar Challenge");
  }
  return res.json();
}

export function useFinishChallenge() {
  return useMutation({
    mutationFn: (data: any) => finishChallenge(data),
  });
}
