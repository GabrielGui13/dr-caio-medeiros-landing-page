import Link from "next/link";

import {
  IconClock,
  IconHome,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/icons";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const linkCls = "inline-flex min-h-11 items-center gap-3 rounded hover:underline";

function Col({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-label-lg text-on-primary">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "bg-footer text-body-sm text-on-footer-muted",
        // espaço extra no celular para a barra de ações fixa (89px)
        "pb-[calc(89px+env(safe-area-inset-bottom))] lg:pb-0",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-4 py-12 lg:px-8 lg:py-16 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-headline-md text-on-primary">{site.name}</p>
            <p className="text-body-sm">
              {site.role} · {site.crm}
            </p>
            <p className="max-w-64">{site.description}</p>
          </div>

          <Col title="Contato">
            <ul className="flex flex-col">
              <li>
                <a href={site.whatsappHref} className={linkCls}>
                  <WhatsAppIcon className="size-6 shrink-0" />
                  WhatsApp {site.whatsapp}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={linkCls}>
                  <IconPhone aria-hidden="true" className="shrink-0" />
                  Telefone {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={linkCls}>
                  <IconMail aria-hidden="true" className="shrink-0" />
                  {site.email}
                </a>
              </li>
            </ul>
          </Col>

          <Col title="Horário de atendimento">
            <ul className="flex flex-col gap-3">
              {site.hours.map((h) => {
                const Icon = h.kind === "home" ? IconHome : IconClock;
                return (
                  <li key={h.text} className="flex gap-3">
                    <Icon aria-hidden="true" className="shrink-0" />
                    {h.text}
                  </li>
                );
              })}
            </ul>
          </Col>

          <Col title="Endereço">
            <div className="flex gap-3">
              <IconMapPin aria-hidden="true" className="shrink-0" />
              <address className="flex flex-col gap-3 not-italic">
                <span>{site.address.street}</span>
                <span>
                  {site.address.city} · {site.address.zip}
                </span>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center font-semibold text-on-primary underline"
                >
                  Como chegar
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </address>
            </div>
          </Col>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 pt-8 text-body-sm lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {site.year} {site.name} · {site.role} · {site.crm}
          </p>
          <Link
            href={site.privacyHref}
            className="inline-flex min-h-11 items-center rounded underline"
          >
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
