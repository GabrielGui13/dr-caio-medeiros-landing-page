"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { IconMinus, IconPlus } from "@/components/icons"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  )
}

/* Cada item é um painel com borda e raio de 4px */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded border border-border bg-surface-container-lowest",
        className
      )}
      {...props}
    />
  )
}

/* Indicador + (fechado) / − (aberto) */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex min-h-14 flex-1 items-center justify-between gap-4 rounded px-6 py-4 text-left text-label-lg text-primary transition-colors hover:bg-surface-container-low disabled:pointer-events-none disabled:text-on-disabled",
          className
        )}
        {...props}
      >
        {children}
        <IconPlus
          aria-hidden="true"
          className="size-6 shrink-0 group-data-[state=open]/accordion-trigger:hidden"
        />
        <IconMinus
          aria-hidden="true"
          className="hidden size-6 shrink-0 group-data-[state=open]/accordion-trigger:block"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden motion-safe:data-[state=closed]:animate-accordion-up motion-safe:data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "px-6 pb-6 text-body-md text-on-surface-variant [&_a]:underline [&_a]:underline-offset-4 [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
