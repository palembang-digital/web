"use client";

import { TypographyH4 } from "@/components/ui/typography";

export default function EventDiscussionPanel({ event }: { event: any }) {
  return (
    <div className="col-span-1 sm:col-span-3 mt-4">
      <div className="flex flex-col gap-2">
        <TypographyH4>Diskusi</TypographyH4>
        <div>Under development 🚧</div>
      </div>
    </div>
  );
}
