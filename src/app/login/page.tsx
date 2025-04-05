import { LoginForm } from "@/components/forms/LoginForm";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
