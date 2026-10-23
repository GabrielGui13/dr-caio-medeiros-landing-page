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
      className={cn(
        "group flex flex-col items-center gap-1 rounded",
        isStatic ? "relative w-fit" : "fixed right-8 bottom-8 z-40 hidden lg:flex",
      )}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-ambient transition-colors group-hover:bg-on-secondary-container">
        <WhatsAppIcon className="size-8" aria-hidden="true" />
      </span>
      <span className="rounded border border-white bg-on-secondary-container px-2 py-1 text-label-md text-on-secondary shadow-ambient">
        WhatsApp
      </span>
    </a>
  );
}
