import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TypographyH4 } from "@/components/ui/typography";

function EventCommittees({ committees }: { committees: any[] }) {
  const items = committees.map(({ user }) => ({
    id: user.id,
    label: user.name,
    image: user.image,
    href: `/${user.username}`,
  }));

  return (
    <div>
      <TypographyH4>Panitia</TypographyH4>
      <div className="flex flex-wrap my-4">
        {items.map((item, index) => (
          <AnimatedTooltip key={`committees-${index}`} items={[item]} />
        ))}
      </div>
    </div>
  );
}

export default EventCommittees;
