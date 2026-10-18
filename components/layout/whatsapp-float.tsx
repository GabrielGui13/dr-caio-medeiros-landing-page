"use client";

import { usePathname } from "next/navigation";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { isBookingPath, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* Botão flutuante do WhatsApp (≥ lg). Não aparece em /agendar. */
export function WhatsAppFloat({
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
    <a
      href={site.whatsappHref}
      aria-label="Conversar no WhatsApp"
      className={cn(
        "flex size-16 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-ambient transition-colors hover:bg-on-secondary-container",
        isStatic ? "relative" : "fixed right-8 bottom-8 z-40 hidden lg:flex",
      )}
    >
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
