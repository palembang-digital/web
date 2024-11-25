import { auth } from "@/auth";
import NotAuthenticated from "@/components/not-authenticated";
import { Separator } from "@/components/ui/separator";

export default async function Email() {
  const session = await auth();

  // @ts-ignore
  if (!session) {
    return <NotAuthenticated />;
  }

  if (!session.user) {
    return <p>User not found</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email</h3>
        <p className="text-sm text-muted-foreground">
          Atur preferensi notifikasi.
        </p>
      </div>
      <Separator />
      <div>Under development 🚧</div>
      {/*
        - New events
        - New videos
        - Development updates
      */}
    </div>
  );
}
