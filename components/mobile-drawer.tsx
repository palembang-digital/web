import { MenuContent } from "@/components/menu-content";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" title="Toggle drawer">
          <Image
            src="/logo-black-bg.svg"
            alt="Palembang Digital"
            width={20}
            height={20}
            loading="lazy"
            className="rounded-full"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-4/5">
        <div className="overflow-y-auto p-4">
          <MenuContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
