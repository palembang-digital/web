import { SCROLL_AREA_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const ScrollArea = ({
  useScrollAreaId = false,
  className,
  children,
}: {
  useScrollAreaId?: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    {...(useScrollAreaId && { id: SCROLL_AREA_ID })}
    className={cn("scrollable-area relative flex w-full flex-col", className)}
  >
    {children}
  </div>
);