"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { IconCheck } from "@/components/icons"

/* Caixa de 28px. Nunca vem marcada por padrão (consentimentos começam desmarcados). */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer flex size-7 shrink-0 items-center justify-center rounded border-2 border-outline bg-surface-container-lowest text-on-primary transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:data-[state=checked]:text-on-disabled aria-invalid:border-error",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <IconCheck aria-hidden="true" className="size-5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

/* Linha clicável de 56px: caixa + rótulo (o rótulo todo marca/desmarca) */
function CheckboxField({
  id,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "children"> & {
  id: string
  label: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex min-h-14 items-center gap-4 has-disabled:text-on-disabled",
        className
      )}
    >
      <Checkbox id={id} {...props} />
      <label
        htmlFor={id}
        className="flex min-h-14 flex-1 cursor-pointer items-center text-body-md peer-disabled:cursor-not-allowed"
      >
        {label}
      </label>
    </div>
  )
}

export { Checkbox, CheckboxField }
