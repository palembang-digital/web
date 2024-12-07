"use client";

import { useEffect } from "react";

export default function AdUnit({
  slot = "2099040602",
  format,
  layout,
}: {
  slot?: string;
  format?: string;
  layout?: string;
}) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("Error loading ads:", e);
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-neutral-400">Iklan</p>
      <ins
        className="adsbygoogle w-full h-full"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4717244633314824"
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
