"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { SignIn } from "@/components/sign-in";
import { NavigationLink } from "@/components/navigation-link";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full p-3">
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  return session ? (
    <NavigationLink
      // @ts-ignore
      href={`/${session.user?.username}`}
      label={session.user?.name || "Profil"}
      icon={
        <Image
          src={session.user?.image || ""}
          width={24}
          height={24}
          alt={session.user?.name || "Profile Picture"}
          className="rounded-full w-6 h-6"
        />
      }
    />
  ) : (
    <SignIn />
  );
};
