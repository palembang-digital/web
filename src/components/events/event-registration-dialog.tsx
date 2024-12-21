"use client";

import ShimmerButton from "@/components/magicui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { localeDate, localeTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon, TicketIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { z } from "zod";

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

  const FormSchema = z.object({
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: "",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(register)} className="space-y-4">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={() => (
                  <FormItem>
                    <FormField
                      control={form.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked)
                              }
                            />
                          </FormControl>
                          <FormLabel className="text-xs font-normal">
                            Dengan ini saya menyatakan bahwa{" "}
                            {rsvp === "yes"
                              ? "saya akan hadir"
                              : "saya tidak bisa hadir"}{" "}
                            pada kegiatan {event.name} pada tanggal{" "}
                            {localeDate(event.scheduledStart)} pukul{" "}
                            {localeTime(event.scheduledStart)}.
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={loading}>
                Kirim
              </Button>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <ShimmerButton onClick={() => signIn()}>
      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10">
        Masuk untuk mendaftar kegiatan
      </span>
      <LogInIcon className="ml-2 h-4 w-4" />
    </ShimmerButton>
  );
}
