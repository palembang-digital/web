"use client";

import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";

export function SideMenu({
  children,
  className,
  isInner,
}: {
  children: React.ReactNode;
  className?: string;
  isInner?: boolean;
}) {
  return (
    <ScrollArea
      className={cn(
        "hidden bg-accent lg:flex lg:flex-col lg:border-r",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-60 xl:w-72",
        className
      )}
    >
      <div className="bg-accent p-3">{children}</div>
    </ScrollArea>
  );
}
