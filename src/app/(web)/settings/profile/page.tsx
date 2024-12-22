import ProfileForm from "@/app/(web)/settings/profile/profile-form";
import { auth } from "@/auth";
import NotAuthenticated from "@/components/not-authenticated";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
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
        <h3 className="text-lg font-medium">Profil</h3>
        <p className="text-sm text-muted-foreground">
          Ini adalah informasi publik tentang kamu yang akan dilihat oleh
          publik.
        </p>
      </div>
      <Separator />
      <ProfileForm user={session.user} />
    </div>
  );
}
