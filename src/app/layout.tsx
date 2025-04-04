import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import AutoLogout from "@/components/common/AutoLogout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModeToggle } from "@/components/common/ModeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Potterdle",
  description: "Potterdle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <h1 className="absolute top-3 left-1/2 -translate-x-1/2 font-HarryFont text-[3rem] text-primary py-5 text-center">
            Potterdle
          </h1>
          <div className="absolute top-3 right-3">
            <ModeToggle />
          </div>
          <AuthProvider>
            <AutoLogout />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
