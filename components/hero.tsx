import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

async function Hero() {
  const session = await auth();

  return (
    <section className="w-full px-4 md:px-16 lg:px-24 py-12 md:py-24 lg:py-32">
      <div className="container flex flex-col items-center justify-center px-4 md:px-6">
        <TypographyH1 className="text-center text-neutral-900">
          Dari Wong Kito, Untuk Wong Kito!
        </TypographyH1>
        <TypographyP className="font-normal leading-8 text-center text-neutral-600 max-w-3xl">
          Terbentuk untuk menjawab pertanyaan &quot;dimana saja pelaku digital
          di Sumatera Selatan?&quot;, Palembang Digital berusaha menjadi tempat
          bagi siapapun yang ingin mengenal, belajar, dan berinteraksi dengan
          ekosistem digital Sumatera Selatan.
        </TypographyP>
        {session ? <>Hi, {session.user?.name}</> : <SignIn />}
      </div>
    </section>
  );
}

export default Hero;
