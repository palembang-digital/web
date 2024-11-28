"use client";

import ShimmerButton from "@/components/magicui/shimmer-button";
import { SignIn } from "@/components/sign-in";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { TicketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function EventRegistrationDialog({
  event,
  user,
  actionType,
}: {
  event: any;
  user: any;
  actionType?: string;
}) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rsvp, setRSVP] = useState("yes");

  const register = async () => {
    setLoading(true);

    const requestData = {
      user: {
        id: user.id,
      },
      rsvp: rsvp,
    };

    try {
      const response = await fetch(`/api/v1/events/${event.id}/registration`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        toast.success(
          actionType === "register"
            ? "Event registration successful"
            : "RSVP updated"
        );
        setLoading(false);
        router.refresh();
        mutate(`/api/v1/events/${event.id}`);
      } else {
        toast.error("Failed to update RSVP to the event");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return user ? (
    <Dialog>
      <DialogTrigger asChild>
        {actionType === "register" ? (
          <ShimmerButton>
            <TicketIcon className="mr-2 h-4 w-4" />
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
              Registrasi sekarang!
            </span>
          </ShimmerButton>
        ) : (
          <p className="text-xs text-neutral-500 hover:cursor-pointer hover:underline">
            Berhalangan hadir? Beri tahu kami dengan meng-update RSVP kamu.
          </p>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "register"
              ? "Konfirmasi Registrasi"
              : "Update Registrasi"}
          </DialogTitle>
          <DialogDescription>{event.name}</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-4 mb-2">
          <div className="text-sm font-medium">Informasi Kamu</div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {actionType === "update" && (
          <div className="space-y-4 mb-2">
            <div className="text-sm font-medium">RSVP Kamu</div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between space-x-4">
                <RadioGroup
                  defaultValue="yes"
                  onValueChange={(e) => setRSVP(e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Ya, saya akan hadir</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Tidak bisa hadir</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button className="w-full" onClick={register} disabled={loading}>
            Kirim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <SignIn text="Masuk untuk mendaftar kegiatan" className="mt-1 text-xs" />
  );
}
