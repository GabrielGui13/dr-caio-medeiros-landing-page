"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconCalendar } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { isBookingPath, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* Barra fixa no rodapé do celular (< lg). Não aparece em /agendar. */
export function MobileActionBar({
  static: isStatic,
  hidden,
}: {
  /** Sem position fixed (showcase) */
  static?: boolean;
  hidden?: boolean;
}) {
  const pathname = usePathname();
  if (hidden ?? (!isStatic && isBookingPath(pathname))) return null;

  return (
    <div
      className={cn(
        "bg-surface-container-lowest p-4 shadow-ambient pb-[calc(1rem+env(safe-area-inset-bottom))]",
        isStatic ? "relative" : "fixed inset-x-0 bottom-0 z-40 lg:hidden",
      )}
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
        <Button asChild>
          <Link href={site.bookingHref}>
            <IconCalendar aria-hidden="true" />
            Agendar
          </Link>
        </Button>
        <Button asChild variant="whatsapp">
          <a href={site.whatsappHref}>
            <WhatsAppIcon />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
