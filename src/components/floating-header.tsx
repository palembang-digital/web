"use client";

import { MobileDrawer } from "@/components/mobile-drawer";
import { MOBILE_SCROLL_THRESHOLD, SCROLL_AREA_ID } from "@/lib/constants";
import { ArrowLeftIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "./ui/button";

interface FloatingHeaderProps {
  scrollTitle?: string;
  title?: string;
  goBackLink?: string;
  session: Session | null;
  children?: React.ReactNode;
}

function Cmp({
  scrollTitle,
  title,
  goBackLink,
  session,
  children,
}: FloatingHeaderProps) {
  const [transformValues, setTransformValues] = useState({
    translateY: 0,
    opacity: scrollTitle ? 0 : 1,
  });

  useEffect(() => {
    const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`);

    const onScroll = (e: any) => {
      const scrollY = e.target.scrollTop;

      const translateY = Math.max(100 - scrollY, 0);
      const opacity = Math.min(
        Math.max(
          // @ts-ignore
          (
            (scrollY -
              MOBILE_SCROLL_THRESHOLD *
                (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) /
            100
          ).toFixed(2),
          0
        ),
        1
      );

      setTransformValues({ translateY, opacity });
    };

    if (scrollTitle) {
      scrollAreaElem?.addEventListener("scroll", onScroll, {
        passive: true,
      });
    }

    return () => scrollAreaElem?.removeEventListener("scroll", onScroll);
  }, [scrollTitle]);

  return (
    <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-white text-sm font-medium lg:hidden">
      <div className="flex size-full items-center px-2">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-1">
            {goBackLink ? (
              <Button variant="ghost" size="icon" className="shrink-0" asChild>
                <Link href={goBackLink} title="Go back">
                  <ArrowLeftIcon size={16} />
                </Link>
              </Button>
            ) : (
              <MobileDrawer session={session} />
            )}

            <Link href="/">
              <Image
                src="/logo-black-bg.png"
                alt="Palembang Digital"
                width={24}
                height={24}
                loading="lazy"
                className="ml-2 mr-2"
              />
            </Link>

            <div className="flex flex-1 items-center justify-between">
              {scrollTitle && (
                <span
                  className="line-clamp-2 font-semibold tracking-tight"
                  style={{
                    transform: `translateY(${transformValues.translateY}%)`,
                    opacity: transformValues.opacity,
                  }}
                >
                  {scrollTitle}
                </span>
              )}

              {title && (
                <Balancer ratio={0.35}>
                  <span className="line-clamp-2 font-semibold tracking-tight">
                    {title}
                  </span>
                </Balancer>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export const FloatingHeader = memo(Cmp);
