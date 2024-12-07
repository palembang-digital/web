"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

interface Props {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly client?: string;
  readonly slot?: string;
  readonly layout?: string;
  readonly layoutKey?: string;
  readonly format?: string;
  readonly responsive?: string;
  readonly pageLevelAds?: boolean;
  readonly adTest?: string;
  readonly children?: React.ReactNode;
}

export default function AdUnit({
  className = "",
  style = { display: "block" },
  client = "ca-pub-4717244633314824",
  slot = "2099040602",
  layout = "",
  layoutKey = "",
  format = "auto",
  responsive = "false",
  pageLevelAds = false,
  adTest,
  children,
  ...rest
}: Props) {
  useEffect(
    () => {
      const p: any = {};
      if (pageLevelAds) {
        p.google_ad_client = client;
        p.enable_page_level_ads = true;
      }

      try {
        if (typeof window === "object") {
          ((window as any).adsbygoogle =
            (window as any).adsbygoogle || []).push(p);
        }
      } catch {
        // Pass
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-neutral-400">Iklan</p>
      <ins
        className={cn("adsbygoogle w-full h-full border", className)}
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-adtest={adTest}
        {...rest}
      >
        {children}
      </ins>
    </div>
  );
}
