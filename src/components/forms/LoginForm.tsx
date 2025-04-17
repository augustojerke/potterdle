"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function LoginForm({ ...props }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.error) {
      alert("Error");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Sign in
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.7-1.4-35-4.2-51.6H272v97.7h147.3c-6.3 34.3-25.3 63.4-53.9 83v68h87.3c51.1-47 80.8-116.3 80.8-197.1z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272 544.3c72.6 0 133.6-24 178.1-65.4l-87.3-68c-24.3 16.3-55.1 25.8-90.8 25.8-69.8 0-129-47.1-150.1-110.5H32.6v69.4c44.6 89.1 137.6 148.7 239.4 148.7z"
                    fill="#34a853"
                  />
                  <path
                    d="M121.9 326.2c-10.2-30.3-10.2-62.9 0-93.2V163.6H32.6c-30.6 61.1-30.6 133.5 0 194.6l89.3-69.4z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272 107.7c39.5 0 75.1 13.6 103.1 40.3l77.4-77.4C405.6 24.4 344.6 0 272 0 170.2 0 77.2 59.6 32.6 148.7l89.3 69.4C143 154.8 202.2 107.7 272 107.7z"
                    fill="#ea4335"
                  />
                </svg>
                Sign in with Google
              </Button>
              <Link href="/register" passHref>
                <Button variant="outline" className="w-full mt-2" type="button">
                  Create an account
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
