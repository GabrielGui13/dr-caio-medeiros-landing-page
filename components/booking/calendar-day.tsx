"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* Rótulo completo em pt-BR: "quarta-feira, 21 de outubro" */
const fullDate = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
export const formatFullDate = (d: Date) => fullDate.format(d);

export type CalendarDayStatus = "available" | "full" | "past";

type CalendarDayProps = Omit<
  React.ComponentProps<"button">,
  "children" | "type"
> & {
  date: Date;
  /** available = livre; full = sem horário (riscado); past = já passou */
  status: CalendarDayStatus;
  isToday?: boolean;
  selected?: boolean;
};

/* Dia do calendário. Indisponível usa aria-disabled (continua focável para a navegação por setas) */
export function CalendarDay({
  date,
  status,
  isToday,
  selected,
  className,
  onClick,
  ...props
}: CalendarDayProps) {
  const unavailable = status !== "available";
  const label = [
    formatFullDate(date),
    isToday ? "hoje" : null,
    status === "full" ? "sem horário livre" : null,
    status === "past" ? "data passada" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={unavailable ? undefined : !!selected}
      aria-disabled={unavailable || undefined}
      aria-current={isToday ? "date" : undefined}
      onClick={(e) => {
        if (unavailable) return;
        onClick?.(e);
      }}
      className={cn(
        "flex h-11 w-full flex-col items-center justify-center rounded border text-label-lg md:h-16",
        status === "available" &&
          "cursor-pointer border-outline bg-surface-container-lowest text-on-surface hover:bg-surface-container-low",
        status === "full" &&
          "cursor-not-allowed border-transparent bg-surface-container-low text-on-surface-variant line-through",
        status === "past" &&
          "cursor-not-allowed border-transparent bg-transparent font-normal text-on-surface-variant",
        isToday && !selected && "border-2 border-primary",
        selected &&
          "border-primary bg-primary text-on-primary hover:bg-primary",
        className,
      )}
      {...props}
    >
      <span>{date.getDate()}</span>
      {isToday ? (
        <span className="text-body-sm leading-none font-semibold no-underline">
          Hoje
        </span>
      ) : null}
    </button>
  );
}

/* Célula vazia da grade (dias de fora do mês) */
export function CalendarDayEmpty() {
  return <div aria-hidden className="h-11 md:h-16" />;
}
