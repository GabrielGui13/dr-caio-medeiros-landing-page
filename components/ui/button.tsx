import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { IconLoader } from "@/components/icons"

/* Botão do DS: 4 estilos do Figma, 56px de altura, foco 3px + offset 2px (global em globals.css) */
const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-3 rounded border text-label-lg whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:border-transparent disabled:bg-disabled disabled:text-on-disabled aria-busy:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        // Primário
        default:
          "border-transparent bg-primary text-on-primary hover:bg-primary-container active:bg-footer",
        // Secundário (contorno azul-marinho)
        secondary:
          "border-primary bg-surface-container-lowest text-primary hover:bg-surface-container-low active:bg-primary-fixed disabled:border-outline/40",
        // WhatsApp (o ícone vem de quem usa: <WhatsAppIcon />)
        whatsapp:
          "border-transparent bg-secondary text-on-secondary hover:bg-[#25573F] active:bg-on-secondary-container",
        // Claro, para fundos escuros (anel de foco claro para ficar visível)
        light:
          "border-transparent bg-primary-fixed text-primary outline-primary-fixed hover:bg-surface-container-lowest active:bg-on-primary-container focus-visible:outline-primary-fixed",
      },
      size: {
        default: "h-14 px-6",
        icon: "size-14 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Ícone à esquerda (ex.: <WhatsAppIcon />) */
    icon?: React.ReactNode
    /** Mostra o spinner, desativa o botão e mantém a largura */
    loading?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  icon,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)
  const common = {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    className: classes,
    "aria-busy": loading || undefined,
  }

  // Como link (ou outro elemento): repassa o filho sem mexer na estrutura
  if (asChild) {
    return (
      <Slot.Root {...common} {...props}>
        {children}
      </Slot.Root>
    )
  }

  const spinner = (
    <IconLoader aria-hidden="true" className="motion-safe:animate-spin" />
  )

  return (
    <button
      {...common}
      disabled={disabled}
      {...props}
      onClick={loading ? undefined : props.onClick}
      tabIndex={loading ? -1 : props.tabIndex}
    >
      {loading ? (
        icon ? (
          spinner
        ) : (
          // Sem ícone: spinner centralizado e rótulo invisível, para manter a largura
          <span className="absolute inset-0 flex items-center justify-center">
            {spinner}
          </span>
        )
      ) : (
        icon
      )}
      {loading && !icon ? <span className="invisible">{children}</span> : children}
    </button>
  )
}

export { Button, buttonVariants }
