"use client";

import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/lib/utils";

export function SideMenu({
  children,
  title,
  className,
  isInner,
  innerAction,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  isInner?: boolean;
  innerAction?: React.ReactNode;
}) {
  return (
    <ScrollArea
      className={cn(
        "hidden bg-accent lg:flex lg:flex-col lg:border-r",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-60 xl:w-72",
        className
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b bg-accent px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">
              {title}
            </span>
            {innerAction && (
              <div className="flex items-center gap-2">{innerAction}</div>
            )}
          </div>
        </div>
      )}
      <div className="bg-accent p-3">{children}</div>
    </ScrollArea>
  );
}
