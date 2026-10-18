"use client";

import * as React from "react";
import { RadioGroup } from "radix-ui";

import { cn } from "@/lib/utils";
import { IconCheck, IconSun, IconSunset } from "@/components/icons";

type TimeSlotProps = Omit<
  React.ComponentProps<typeof RadioGroup.Item>,
  "children"
> & {
  /** Ex.: "09:00" */
  value: string;
  /** Ocupado: sem fundo, com o texto "ocupado", desativado */
  busy?: boolean;
};

/* Horário (radio): 56px, estados Livre / Ocupado / Selecionado */
export function TimeSlot({ value, busy, className, ...props }: TimeSlotProps) {
  return (
    <RadioGroup.Item
      value={value}
      disabled={busy || props.disabled}
      className={cn(
        "group flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded border border-outline bg-surface-container-lowest text-label-lg text-on-surface transition-colors",
        "hover:bg-surface-container-low",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-on-primary",
        "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-on-surface-variant",
        className,
      )}
      {...props}
    >
      <RadioGroup.Indicator asChild>
        <IconCheck aria-hidden className="size-5" />
      </RadioGroup.Indicator>
      <span className={cn(busy && "text-body-md font-normal")}>{value}</span>
      {busy ? <span className="text-body-sm font-normal">ocupado</span> : null}
    </RadioGroup.Item>
  );
}

type TimeSlotGroupProps = {
  period: "Manhã" | "Tarde";
  value?: string;
  onValueChange?: (value: string) => void;
  /** Horários do período; `busy` marca os ocupados */
  slots: { time: string; busy?: boolean }[];
  className?: string;
};

/* Grupo de horários de um período: radio group, 4 colunas no desktop e 2 no mobile */
export function TimeSlotGroup({
  period,
  value,
  onValueChange,
  slots,
  className,
}: TimeSlotGroupProps) {
  const id = React.useId();
  const Icon = period === "Manhã" ? IconSun : IconSunset;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h4
        id={id}
        className="flex items-center gap-2 text-label-lg text-primary"
      >
        <Icon aria-hidden className="size-6" />
        {period}
      </h4>
      <RadioGroup.Root
        aria-labelledby={id}
        value={value}
        onValueChange={onValueChange}
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {slots.map((s) => (
          <TimeSlot key={s.time} value={s.time} busy={s.busy} />
        ))}
      </RadioGroup.Root>
    </div>
  );
}
