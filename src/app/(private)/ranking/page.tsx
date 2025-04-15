"use client";

import { useUsers } from "@/app/actions/user-actions";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function Page() {
  const { data: user, isLoading, error } = useUsers();

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-10">
        <LoadingSpinner color="text-white" />
      </div>
    );
  if (error || !user) return <div>Error</div>;

  return (
    <div>
      <h1>ranking</h1>
    </div>
  );
}
