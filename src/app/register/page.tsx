import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
