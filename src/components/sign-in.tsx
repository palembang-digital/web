"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignIn({
  className,
  text = "Masuk",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <Button className={className} variant="outline" onClick={() => signIn()}>
      {text} <LogInIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
