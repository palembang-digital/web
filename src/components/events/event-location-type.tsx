import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function EventLocationType({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-sm px-2 capitalize text-xs",
        type === "offline" && "border-red-100 bg-red-100 text-red-500 ",
        type === "online" && "border-blue-100 bg-blue-100 text-blue-500",
        type === "hybrid" && "border-green-100 bg-green-100 text-green-500",
        className
      )}
    >
      {type || "offline"}
    </Badge>
  );
}
