import {
  IconAccessibility,
  IconActivity,
  IconAlert,
  IconArrowLeft,
  IconArrowRight,
  IconAward,
  IconCalendar,
  IconCar,
  IconCard,
  IconCheck,
  IconCheckCircle,
  IconChat,
  IconChevronLeft,
  IconChevronRight,
  IconClinic,
  IconClock,
  IconFile,
  IconHeart,
  IconHome,
  IconHourglass,
  IconImage,
  IconInfo,
  IconLoader,
  IconLock,
  IconMail,
  IconMapPin,
  IconMenu,
  IconMinus,
  IconParking,
  IconPhone,
  IconPill,
  IconPlus,
  IconSearch,
  IconShield,
  IconStethoscope,
  IconSun,
  IconSunset,
  IconUser,
  IconUsers,
  IconVideo,
} from "@/components/icons";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-headline-lg text-primary">
    {children}
  </h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-headline-md text-primary">{children}</h3>
);

/* ---------------- Cores ---------------- */
// [token, hex, texto sobre ele, hex do texto, contraste]
type Sw = { token: string; hex: string; pair?: { name: string; hex: string; ratio: string } };
const colorGroups: { title: string; items: Sw[] }[] = [
  {
    title: "Primária",
    items: [
      { token: "primary", hex: "#002045", pair: { name: "on-primary", hex: "#FFFFFF", ratio: "16,6:1 AAA" } },
      { token: "primary-container", hex: "#1A365D", pair: { name: "on-primary-container", hex: "#B4C8EC", ratio: "7,6:1 AAA" } },
      { token: "primary-fixed", hex: "#D6E3FF", pair: { name: "primary", hex: "#002045", ratio: "13,6:1 AAA" } },
      { token: "inverse-primary", hex: "#ADC7F7", pair: { name: "primary", hex: "#002045", ratio: "9,8:1 AAA" } },
    ],
  },
  {
    title: "Secundária",
    items: [
      { token: "secondary", hex: "#2C694E", pair: { name: "on-secondary", hex: "#FFFFFF", ratio: "6,5:1 AA" } },
      { token: "secondary-container", hex: "#AEEECB", pair: { name: "on-secondary-container", hex: "#0E5138", ratio: "6,7:1 AA" } },
    ],
  },
  {
    title: "Superfícies",
    items: [
      { token: "surface", hex: "#F9F9FF", pair: { name: "on-surface", hex: "#161C27", ratio: "16,2:1 AAA" } },
      { token: "surface-container-lowest", hex: "#FFFFFF", pair: { name: "on-surface", hex: "#161C27", ratio: "16,8:1 AAA" } },
      { token: "surface-container-low", hex: "#F1F3FF", pair: { name: "on-surface", hex: "#161C27", ratio: "15,3:1 AAA" } },
      { token: "surface-container", hex: "#E8EEFF", pair: { name: "on-surface", hex: "#161C27", ratio: "14,5:1 AAA" } },
      { token: "surface-container-high", hex: "#E3E8F9", pair: { name: "on-surface", hex: "#161C27", ratio: "13,8:1 AAA" } },
    ],
  },
  {
    title: "Texto e bordas",
    items: [
      { token: "on-surface", hex: "#161C27", pair: { name: "surface", hex: "#F9F9FF", ratio: "16,2:1 AAA" } },
      { token: "on-surface-variant", hex: "#43474E", pair: { name: "surface", hex: "#F9F9FF", ratio: "9,0:1 AAA" } },
      { token: "placeholder", hex: "#6B6F77", pair: { name: "branco", hex: "#FFFFFF", ratio: "5,0:1 AA" } },
      { token: "outline", hex: "#74777F", pair: { name: "branco", hex: "#FFFFFF", ratio: "4,6:1 (borda, ≥ 3:1)" } },
      { token: "border", hex: "#E2E8F0" },
    ],
  },
  {
    title: "Estados",
    items: [
      { token: "focus-ring", hex: "#002045", pair: { name: "surface", hex: "#F9F9FF", ratio: "16,2:1 AAA" } },
      { token: "disabled", hex: "#E3E8F9", pair: { name: "on-disabled", hex: "#43474E", ratio: "7,7:1 AAA" } },
      { token: "error", hex: "#BA1A1A", pair: { name: "branco", hex: "#FFFFFF", ratio: "6,5:1 AA" } },
      { token: "error-container", hex: "#FFDAD6", pair: { name: "error", hex: "#BA1A1A", ratio: "4,9:1 AA" } },
    ],
  },
  {
    title: "Rodapé",
    items: [
      { token: "footer", hex: "#001B3C", pair: { name: "on-footer-muted", hex: "#C9D6EF", ratio: "11,2:1 AAA" } },
    ],
  },
];

export function ColorsSection() {
  return (
    <section aria-labelledby="ds-cores" className="flex flex-col gap-8">
      <H2 id="ds-cores">Cores</H2>
      {colorGroups.map((g) => (
        <div key={g.title} className="flex flex-col gap-4">
          <H3>{g.title}</H3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {g.items.map((c) => (
              <li
                key={c.token}
                className="overflow-hidden rounded border border-border bg-surface-container-lowest"
              >
                <div
                  className="flex h-24 items-center px-4 text-label-lg"
                  style={{ backgroundColor: c.hex, color: c.pair?.hex ?? "#161C27" }}
                >
                  {c.pair ? "Aa — texto de exemplo" : "Aa"}
                </div>
                <div className="flex flex-col gap-1 p-4 text-body-sm">
                  <span className="text-label-lg text-primary">{c.token}</span>
                  <span className="text-on-surface-variant">{c.hex}</span>
                  {c.pair && (
                    <span className="text-on-surface-variant">
                      Texto: {c.pair.name} {c.pair.hex} · {c.pair.ratio}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/* ---------------- Tipografia ---------------- */
const type = [
  ["text-display", "60/1.1 bold, -0,02em (H1 desktop)", "Cuidado com a sua saúde"],
  ["text-display-mobile", "40/1.1 bold (H1 celular)", "Cuidado com a sua saúde"],
  ["text-headline-lg", "32/1.3 bold, -0,01em", "Como funciona a consulta"],
  ["text-headline-lg-mobile", "28/1.3 bold", "Como funciona a consulta"],
  ["text-headline-md", "24/1.4 semibold", "Atendimento em casa ou por vídeo"],
  ["text-headline-md-mobile", "22/1.4 semibold", "Atendimento em casa ou por vídeo"],
  ["text-body-lg", "20/1.6 regular", "Escolha o melhor dia e horário para a sua consulta, com calma."],
  ["text-body-md", "18/1.6 regular (base)", "Escolha o melhor dia e horário para a sua consulta, com calma."],
  ["text-body-sm", "16/1.5 regular (mínimo)", "Você receberá a confirmação por mensagem."],
  ["text-label-lg", "18/1.2 semibold (botões, menu)", "Agendar consulta"],
  ["text-label-md", "16/1.2 semibold", "Horário disponível"],
] as const;

export function TypographySection() {
  return (
    <section aria-labelledby="ds-tipografia" className="flex flex-col gap-8">
      <H2 id="ds-tipografia">Tipografia</H2>
      <p className="text-body-md text-on-surface-variant">
        Public Sans. Títulos em primary, texto em on-surface, descrições em on-surface-variant.
      </p>
      <ul className="flex flex-col gap-6">
        {type.map(([cls, spec, sample]) => (
          <li key={cls} className="flex flex-col gap-2 border-b border-border pb-6">
            <p className="text-body-sm text-on-surface-variant">
              {cls} · {spec}
            </p>
            <p className={`${cls} text-primary`}>{sample}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Raio, espaçamento e efeitos ---------------- */
const spaces = [4, 8, 12, 16, 24, 32, 48, 64, 80, 96];

export function EffectsSection() {
  return (
    <section aria-labelledby="ds-efeitos" className="flex flex-col gap-10">
      <H2 id="ds-efeitos">Raio, espaçamento e efeitos</H2>

      <div className="flex flex-col gap-4">
        <H3>Raio</H3>
        <ul className="flex flex-wrap gap-8">
          {[
            ["radius (4px)", "rounded"],
            ["radius-sm (2px)", "rounded-xs"],
            ["radius-full", "rounded-full"],
          ].map(([label, cls]) => (
            <li key={label} className="flex flex-col items-start gap-2">
              <div className={`size-24 border-2 border-primary bg-primary-fixed ${cls}`} />
              <span className="text-body-sm text-on-surface-variant">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <H3>Espaçamento</H3>
        <ul className="flex flex-col gap-3">
          {spaces.map((s) => (
            <li key={s} className="flex items-center gap-4">
              <span className="w-16 text-body-sm text-on-surface-variant">{s}px</span>
              <div className="h-6 rounded-xs bg-primary" style={{ width: s }} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <H3>Foco e sombra</H3>
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-col gap-3">
            <div className="flex h-14 w-64 items-center justify-center rounded border border-outline bg-surface-container-lowest text-body-md outline-[3px] outline-offset-2 outline-focus-ring">
              Anel de foco
            </div>
            <span className="text-body-sm text-on-surface-variant">
              3px focus-ring + 2px de offset (em todo elemento interativo)
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex h-14 w-64 items-center justify-center rounded bg-surface-container-lowest text-body-md shadow-ambient">
              shadow-ambient
            </div>
            <span className="text-body-sm text-on-surface-variant">
              0 4px 20px rgba(0,0,0,.08) — só em elementos flutuantes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ícones ---------------- */
const icons = [
  ["IconCalendar", IconCalendar], ["IconChat", IconChat], ["IconHome", IconHome],
  ["IconVideo", IconVideo], ["IconClinic", IconClinic], ["IconCheckCircle", IconCheckCircle],
  ["IconShield", IconShield], ["IconHeart", IconHeart], ["IconClock", IconClock],
  ["IconUser", IconUser], ["IconUsers", IconUsers], ["IconPhone", IconPhone],
  ["IconMail", IconMail], ["IconMapPin", IconMapPin], ["IconArrowRight", IconArrowRight],
  ["IconArrowLeft", IconArrowLeft], ["IconChevronLeft", IconChevronLeft],
  ["IconChevronRight", IconChevronRight], ["IconCheck", IconCheck],
  ["IconAccessibility", IconAccessibility], ["IconParking", IconParking],
  ["IconImage", IconImage], ["IconStethoscope", IconStethoscope], ["IconActivity", IconActivity],
  ["IconAward", IconAward], ["IconMenu", IconMenu], ["IconLock", IconLock],
  ["IconSun", IconSun], ["IconSunset", IconSunset], ["IconInfo", IconInfo],
  ["IconCar", IconCar], ["IconLoader", IconLoader], ["IconAlert", IconAlert],
  ["IconCard", IconCard], ["IconFile", IconFile], ["IconPill", IconPill],
  ["IconHourglass", IconHourglass], ["IconSearch", IconSearch], ["IconPlus", IconPlus],
  ["IconMinus", IconMinus],
] as const;

export function IconsSection() {
  return (
    <section aria-labelledby="ds-icones" className="flex flex-col gap-8">
      <H2 id="ds-icones">Ícones</H2>
      <p className="text-body-md text-on-surface-variant">
        Lucide, traço 2, 24px. Ícones decorativos recebem aria-hidden.
      </p>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {icons.map(([name, Cmp]) => (
          <li
            key={name}
            className="flex flex-col items-center gap-3 rounded border border-border bg-surface-container-lowest p-4"
          >
            <Cmp aria-hidden="true" className="size-6 text-primary" />
            <span className="text-center text-body-sm break-all text-on-surface-variant">
              {name}
            </span>
          </li>
        ))}
        <li className="flex flex-col items-center gap-3 rounded border border-border bg-surface-container-lowest p-4">
          <WhatsAppIcon className="size-6 text-secondary" />
          <span className="text-center text-body-sm text-on-surface-variant">
            WhatsAppIcon
          </span>
        </li>
      </ul>
    </section>
  );
}

/* ---------------- Layout ---------------- */
export function LayoutSection() {
  return (
    <section aria-labelledby="ds-layout" className="flex flex-col gap-10">
      <H2 id="ds-layout">Layout</H2>

      <div className="flex flex-col gap-4">
        <H3>Header / Desktop</H3>
        {(
          [
            ["Início", "/"],
            ["Sobre", "/sobre"],
            ["Serviços", "/servicos"],
            ["Contato", "/contato"],
            ["Agendamento", "/agendar"],
          ] as const
        ).map(([label, path]) => (
          <div key={label} className="flex flex-col gap-2">
            <p className="text-body-sm text-on-surface-variant">Página = {label}</p>
            <div className="overflow-x-auto rounded border border-border">
              <div className="min-w-[1100px]">
                <SiteHeader layout="desktop" currentPath={path} static />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <H3>Header / Mobile</H3>
        <div className="w-full max-w-[390px] overflow-hidden rounded border border-border">
          <SiteHeader layout="mobile" currentPath="/" static />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <H3>Barra de ações / Mobile</H3>
        <div className="w-full max-w-[390px] overflow-hidden rounded border border-border bg-surface">
          <MobileActionBar static hidden={false} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <H3>WhatsApp flutuante</H3>
        <div className="w-fit rounded border border-border bg-surface p-8">
          <WhatsAppFloat static hidden={false} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <H3>Footer</H3>
        <SiteFooter className="rounded" />
      </div>
    </section>
  );
}
