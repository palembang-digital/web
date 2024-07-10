import GridPattern from "@/components/magicui/grid-pattern";
import { TypographyH1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

async function Hero() {
  return (
    <section className="relative h-full w-full items-center justify-center overflow-hidden bg-background p-20">
      <TypographyH1 className="z-10 whitespace-pre-wrap text-center text-neutral-900">
        #KomunitasKolaborasi
      </TypographyH1>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(480px_circle_at_center,white,transparent)] "
        )}
      />
    </section>
  );
}

export default Hero;
