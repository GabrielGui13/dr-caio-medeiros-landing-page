"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconCalendar, IconMenu } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { isBookingPath, navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /** Força um layout (usado no showcase); padrão: responsivo por breakpoint */
  layout?: "responsive" | "desktop" | "mobile";
  /** Caminho considerado ativo; padrão: usePathname() */
  currentPath?: string;
  /** Sem sticky (showcase) */
  static?: boolean;
};

function Wordmark() {
  return (
    <Link href="/" className="flex flex-col gap-1 rounded">
      <span className="text-headline-md text-primary">{site.name}</span>
      <span className="text-body-sm text-on-surface-variant">
        {site.role} · {site.crm}
      </span>
    </Link>
  );
}

export function SiteHeader({
  layout = "responsive",
  currentPath,
  static: isStatic,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const path = currentPath ?? pathname;
  const booking = isBookingPath(path);
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);

  const showDesktop =
    layout === "desktop" ? "flex" : layout === "mobile" ? "hidden" : "hidden lg:flex";
  const showMobile =
    layout === "mobile" ? "flex" : layout === "desktop" ? "hidden" : "flex lg:hidden";

  const bookingButton = (
    <Button
      asChild
      aria-current={booking ? "page" : undefined}
      className={cn(
        booking &&
          "after:absolute after:inset-x-0 after:-bottom-3 after:h-[3px] after:bg-secondary",
      )}
    >
      <Link href={site.bookingHref}>
        <IconCalendar aria-hidden="true" />
        Agendar consulta
      </Link>
    </Button>
  );

  return (
    <header
      className={cn(
        "z-40 border-b border-border bg-surface-container-lowest",
        isStatic ? "relative" : "sticky top-0",
      )}
    >
      {/* Desktop */}
      <div
        className={cn(
          "mx-auto h-[103px] max-w-[1440px] items-center justify-between px-8 xl:px-24",
          showDesktop,
        )}
      >
        <Wordmark />
        <nav aria-label="Principal" className="flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => {
              const active = isActive(l.href) && !booking;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-14 items-center rounded text-label-lg",
                      active ? "text-primary" : "text-on-surface-variant hover:text-primary",
                    )}
                  >
                    {l.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-2 h-[3px] bg-secondary"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          {bookingButton}
        </nav>
      </div>

      {/* Mobile */}
      <div
        className={cn(
          "h-[93px] items-center justify-between px-4",
          showMobile,
        )}
      >
        <Wordmark />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" icon={<IconMenu aria-hidden="true" />}>
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="gap-0 p-4">
            <SheetTitle className="flex h-14 items-center">Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navegação do site
            </SheetDescription>
            <nav aria-label="Principal (celular)" className="mt-6 flex flex-col">
              {navLinks.map((l) => {
                const active = isActive(l.href) && !booking;
                return (
                  <SheetClose asChild key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-14 items-center rounded px-2 text-label-lg",
                        active
                          ? "border-l-[3px] border-secondary bg-surface-container-low text-primary"
                          : "text-on-surface-variant",
                      )}
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
            <div className="mt-6">
              <SheetClose asChild>
                <Button
                  asChild
                  className="w-full"
                  aria-current={booking ? "page" : undefined}
                >
                  <Link href={site.bookingHref}>
                    <IconCalendar aria-hidden="true" />
                    Agendar consulta
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
