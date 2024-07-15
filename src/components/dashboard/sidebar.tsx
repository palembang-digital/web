import { Button } from "@//components/ui/button";
import { cn } from "@//lib/utils";
import { CalendarDays, UsersRound } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

// TODO
export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Palembang Digital
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <CalendarDays className="mr-2 h-4 w-4" />
              Events
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <UsersRound className="mr-2 h-4 w-4" />
              Members
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
