/*
 * Dados do site em UM só lugar. Tudo aqui é provisório (placeholder):
 * os dados reais do médico substituem este arquivo depois.
 */
export const site = {
  name: "Dr. Caio Medeiros",
  role: "Médico",
  crm: "CRM/UF 00000",
  description:
    "Clínica geral com atendimento humanizado — no consultório, por vídeo ou na sua casa.",
  phone: "(00) 0000-0000",
  phoneHref: "tel:+550000000000",
  whatsappHref: "https://wa.me/550000000000",
  email: "contato@exemplo.com.br",
  address: {
    street: "Rua Exemplo, 123 — Centro",
    city: "Cidade/UF",
    zip: "CEP 00000-000",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Exemplo+123+Centro",
  hours: [
    { days: "Seg. a sex.", time: "8h às 18h" },
    { days: "Sábado", time: "8h às 12h" },
    { days: "Domingo e feriados", time: "fechado" },
  ],
  year: 2026,
  privacyHref: "/privacidade",
  bookingHref: "/agendar",
} as const;

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
] as const;

/** Rotas de agendamento: sem WhatsApp flutuante nem barra de ações */
export const isBookingPath = (pathname: string | null) =>
  !!pathname && (pathname === "/agendar" || pathname.startsWith("/agendar/"));
