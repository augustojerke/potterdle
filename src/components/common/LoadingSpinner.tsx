import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  color?: string;
}

export function LoadingSpinner({
  color = "text-primary-foreground",
}: LoadingSpinnerProps) {
  return <Loader2 className={`w-10 h-10 animate-spin ${color}`} />;
}
