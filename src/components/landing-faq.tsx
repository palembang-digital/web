import { TypographyH2 } from "@/components/ui/typography";

// TODO: #80 Implement LandingFAQ component
export default function LandingFAQ() {
  return (
    <div className="rounded-lg p-6 mt-20">
      <p className="italic text-neutral-400">FAQ</p>
      <TypographyH2 className="text-neutral-800">
        Get to know us more!
      </TypographyH2>

      <p>Apa itu Palembang Digital?</p>
    </div>
  );
}
