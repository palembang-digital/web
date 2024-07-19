import { auth } from "@/auth";
import { FloatingHeader } from "@/components/floating-header";
import OnboardingForm from "@/components/onboarding/onboarding-form";
import { ScrollArea } from "@/components/scroll-area";

export default async function Page() {
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "administrator") {
    return <p>Not authenticated</p>;
  }

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader session={session} scrollTitle="Onboarding" />
      <div className="content-wrapper">
        <div className="content">
          <p>Hai, {session.user?.name} 👋</p>
          <p>Selamat bergabung di komunitas Palembang Digital!</p>
          <p>Untuk memulai, harap lengkapi data berikut ya.</p>
          <br />
          <OnboardingForm user={session.user} />
        </div>
      </div>
    </ScrollArea>
  );
}
