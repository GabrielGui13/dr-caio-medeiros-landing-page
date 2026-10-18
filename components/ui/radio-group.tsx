"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-1", className)}
      {...props}
    />
  )
}

/* Círculo de 28px: marcado = anel azul-marinho + ponto central. Nunca vem marcado por padrão. */
function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-outline bg-surface-container-lowest transition-colors data-[state=checked]:border-primary disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled aria-invalid:border-error",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="block size-3.5 rounded-full bg-primary"
      />
    </RadioGroupPrimitive.Item>
  )
}

/* Linha clicável de 56px: círculo + rótulo */
function RadioField({
  id,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, "children"> & {
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
      <RadioGroupItem id={id} {...props} />
      <label
        htmlFor={id}
        className="flex min-h-14 flex-1 cursor-pointer items-center text-body-md peer-disabled:cursor-not-allowed"
      >
        {label}
      </label>
    </div>
  )
}

export { RadioGroup, RadioGroupItem, RadioField }
