import ShimmerButton from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {} from "@radix-ui/react-dialog";
import { TicketIcon } from "lucide-react";

export default function EventRegistrationDialog({
  event,
  user,
}: {
  event: any;
  user: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ShimmerButton>
          <TicketIcon className="mr-2 h-4 w-4" />
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
            Registrasi sekarang!
          </span>
        </ShimmerButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Registrasi</DialogTitle>
          <DialogDescription>{event.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input readOnly value={user.name} />
          <Input readOnly value={user.email} />
          <Input readOnly value={user.phoneNumber} />
        </div>
        <DialogFooter>
          <Button className="w-full">Kirim</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
