"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  CalendarDay,
  CalendarDayEmpty,
  type CalendarDayStatus,
} from "./calendar-day";

const WEEKDAYS = [
  { short: "Dom", long: "domingo" },
  { short: "Seg", long: "segunda-feira" },
  { short: "Ter", long: "terça-feira" },
  { short: "Qua", long: "quarta-feira" },
  { short: "Qui", long: "quinta-feira" },
  { short: "Sex", long: "sexta-feira" },
  { short: "Sáb", long: "sábado" },
];

const monthFmt = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});
export const formatMonth = (d: Date) => {
  const s = monthFmt.format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

type BookingCalendarProps = {
  month: Date;
  today: Date;
  isAvailable: (date: Date) => boolean;
  selected?: Date;
  onSelect: (date: Date) => void;
  /** id do título do mês (para a página rotular/ligar a navegação) */
  headingId?: string;
  /** false = a página renderiza o próprio título com o `headingId` informado */
  showHeading?: boolean;
  className?: string;
};

/* Calendário de agendamento: role="grid" com tabindex móvel e navegação por setas */
export function BookingCalendar({
  month,
  today,
  isAvailable,
  selected,
  onSelect,
  headingId,
  showHeading = true,
  className,
}: BookingCalendarProps) {
  const autoId = React.useId();
  const hId = headingId ?? `${autoId}-heading`;
  const legendId = `${autoId}-legend`;
  const year = month.getFullYear();
  const m = month.getMonth();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const offset = new Date(year, m, 1).getDay();

  const statusOf = (d: Date): CalendarDayStatus => {
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d < t) return "past";
    return isAvailable(d) ? "available" : "full";
  };

  // Dia que recebe o tabindex 0: o selecionado, senão o primeiro disponível, senão o dia 1
  const defaultDay = React.useMemo(() => {
    if (
      selected &&
      selected.getMonth() === m &&
      selected.getFullYear() === year
    )
      return selected.getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      if (statusOf(new Date(year, m, d)) === "available") return d;
    }
    return 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, year, m, daysInMonth, today, isAvailable]);

  const [focusDay, setFocusDay] = React.useState<number | null>(null);
  const tabDay = focusDay ?? defaultDay;

  const move = (to: number, from: HTMLElement) => {
    const next = Math.min(daysInMonth, Math.max(1, to));
    setFocusDay(next);
    from
      .closest('[role="grid"]')
      ?.querySelector<HTMLButtonElement>(`[data-day="${next}"]`)
      ?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, day: number) => {
    const col = (offset + day - 1) % 7;
    const keys: Record<string, number> = {
      ArrowLeft: day - 1,
      ArrowRight: day + 1,
      ArrowUp: day - 7,
      ArrowDown: day + 7,
      Home: day - col,
      End: day + (6 - col),
    };
    if (e.key in keys) {
      e.preventDefault();
      move(keys[e.key], e.currentTarget as HTMLElement);
    }
  };

  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);
  const rows = Array.from({ length: cells.length / 7 }, (_, r) =>
    cells.slice(r * 7, r * 7 + 7),
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showHeading ? (
        <h3 id={hId} className="text-headline-md text-primary">
          {formatMonth(month)}
        </h3>
      ) : null}
      <div
        role="grid"
        aria-labelledby={hId}
        aria-describedby={legendId}
        className="flex flex-col gap-2"
      >
        <div role="row" className="grid grid-cols-7 gap-1 md:gap-2">
          {WEEKDAYS.map((w) => (
            <div
              key={w.short}
              role="columnheader"
              className="text-center text-label-md text-on-surface-variant"
            >
              <abbr title={w.long} className="no-underline">
                {w.short}
              </abbr>
            </div>
          ))}
        </div>
        {rows.map((row, r) => (
          <div key={r} role="row" className="grid grid-cols-7 gap-1 md:gap-2">
            {row.map((day, c) => (
              <div key={c} role="gridcell">
                {day === null ? (
                  <CalendarDayEmpty />
                ) : (
                  (() => {
                    const date = new Date(year, m, day);
                    return (
                      <CalendarDay
                        data-day={day}
                        date={date}
                        status={statusOf(date)}
                        isToday={sameDay(date, today)}
                        selected={!!selected && sameDay(date, selected)}
                        tabIndex={day === tabDay ? 0 : -1}
                        onFocus={() => setFocusDay(day)}
                        onKeyDown={(e) => onKeyDown(e, day)}
                        onClick={() => onSelect(date)}
                      />
                    );
                  })()
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p id={legendId} className="text-body-sm text-on-surface-variant">
        Dias riscados não têm horário livre.
      </p>
    </div>
  );
}
