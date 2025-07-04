"use client";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { BrandThemeProvider } from "@/components/layout/BrandThemeProvider";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <BrandThemeProvider><AuthProvider>{children}</AuthProvider></BrandThemeProvider>;
} 