"use client";

import * as React from "react";
import { RadioGroup } from "radix-ui";

import { cn } from "@/lib/utils";

/* Grupo de opções de atendimento (radio group): setas do teclado já funcionam via Radix */
type ServiceOptionGroupProps = Omit<
  React.ComponentProps<typeof RadioGroup.Root>,
  "aria-label" | "aria-labelledby"
> &
  (
    | { "aria-labelledby": string; "aria-label"?: never }
    | { "aria-label": string; "aria-labelledby"?: never }
  );

export function ServiceOptionGroup({
  className,
  ...props
}: ServiceOptionGroupProps) {
  return (
    <RadioGroup.Root
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

type ServiceOptionProps = Omit<
  React.ComponentProps<typeof RadioGroup.Item>,
  "children" | "title"
> & {
  value: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  /** Ex.: "R$ 000 · consulta" ou um ReactNode; nada é exibido se ausente */
  price?: React.ReactNode;
};

/* Cartão grande clicável: linha compacta: selo quadrado com ícone, título, descrição, preço e indicador de rádio */
export function ServiceOption({
  icon,
  title,
  description,
  price,
  className,
  ...props
}: ServiceOptionProps) {
  const titleId = React.useId();
  const descId = React.useId();
  return (
    <RadioGroup.Item
      aria-labelledby={titleId}
      aria-describedby={descId}
      className={cn(
        "group flex min-h-19 w-full cursor-pointer items-center gap-4 rounded border border-outline bg-surface-container-lowest p-4 text-left transition-colors",
        "hover:bg-surface-container-low",
        "data-[state=checked]:border-2 data-[state=checked]:border-primary data-[state=checked]:bg-surface-container-low data-[state=checked]:p-[15px]",
        "disabled:cursor-not-allowed disabled:bg-disabled disabled:text-on-disabled",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded bg-surface-container-low text-primary group-data-[state=checked]:bg-primary group-data-[state=checked]:text-on-primary [&_svg]:size-6"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span id={titleId} className="text-label-lg text-primary">
          {title}
        </span>
        <span id={descId} className="text-body-sm text-on-surface-variant">
          {description}
        </span>
      </span>
      {price ? (
        <span className="shrink-0 text-label-md whitespace-nowrap text-on-surface">
          {price}
        </span>
      ) : null}
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-outline bg-surface-container-lowest group-data-[state=checked]:border-primary"
      >
        <RadioGroup.Indicator className="size-3 rounded-full bg-primary" />
      </span>
    </RadioGroup.Item>
  );
}
