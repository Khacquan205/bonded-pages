import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { wedding } from "@/config/wedding";
import { ZaloButton } from "./ZaloButton";

function Body() {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col gap-3 px-6 pb-8 pt-2">
      {(["bride", "groom"] as const).map((p) => (
        <div key={p} className="flex items-center gap-4 rounded-md border border-eucalyptus bg-sage-mist/40 p-3">
          <img
            src={wedding.couple[p].avatar}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-12 rounded-full object-cover"
            style={{ aspectRatio: "1 / 1" }}
          />
          <div className="min-w-0 flex-1">
            <p className="label-caps">
              {lang === "vi" ? (p === "bride" ? "Cô dâu" : "Chú rể") : p === "bride" ? "Bride" : "Groom"}
            </p>
            <p className="truncate text-sm text-ink">{wedding.couple[p].name}</p>
          </div>
          <ZaloButton person={p} className="shrink-0 px-4 py-2 text-xs" />
        </div>
      ))}
    </div>
  );
}

export function ContactPicker({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const title = lang === "vi" ? "Nhắn tin xác nhận" : "Confirm your attendance";
  const desc =
    lang === "vi"
      ? "Chọn người bạn muốn nhắn tin qua Zalo."
      : "Choose who you'd like to message on Zalo.";

  const header = (
    <div className="px-6 pb-1 pt-6 text-center">
      <p className="font-display text-2xl text-olive-deep">{title}</p>
      <p className="mt-1 text-sm text-ink-muted">{desc}</p>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="border-eucalyptus bg-cream">
          <DrawerTitle className="sr-only">{title}</DrawerTitle>
          <DrawerDescription className="sr-only">{desc}</DrawerDescription>
          {header}
          <Body />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md gap-0 rounded-lg border-eucalyptus bg-cream p-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{desc}</DialogDescription>
        {header}
        <Body />
      </DialogContent>
    </Dialog>
  );
}
