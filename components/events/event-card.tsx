import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

function EventCard(event: any) {
  return (
    <Card className="w-[200px]">
      <CardHeader>
        <Image className="object-cover " src={event.imageUrl} alt={""} />
      </CardHeader>
      <CardContent className="text-muted-foreground flex flex-col text-sm">
        <p>{event.scheduledEnd}</p>
        <p className="truncate text-lg font-bold text-black">{event.name}</p>
        <p>tempat</p>
      </CardContent>
    </Card>
  );
}

export default EventCard;
