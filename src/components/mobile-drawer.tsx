import { MenuContent } from "@/components/menu-content";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTitle />
      <DrawerDescription />
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" title="Toggle drawer">
          <Image
            src="/logo-black-bg.png"
            alt="Palembang Digital"
            width={20}
            height={20}
            loading="lazy"
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