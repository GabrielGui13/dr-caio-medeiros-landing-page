import * as React from "react"

import { cn } from "@/lib/utils"
import { IconAlert } from "@/components/icons"
import { Label } from "@/components/ui/label"

type FormFieldProps = {
  label: string
  /** id do controle (input/textarea) */
  id: string
  /** Texto de ajuda abaixo do campo */
  hint?: string
  /** Mensagem de erro (troca a ajuda e marca o campo como inválido) */
  error?: string
  /** Campos opcionais ganham "(opcional)" ao lado do rótulo */
  optional?: boolean
  className?: string
  /** Função que recebe os atributos de acessibilidade e devolve o controle */
  children: (a11y: {
    id: string
    "aria-invalid": true | undefined
    "aria-describedby": string | undefined
  }) => React.ReactNode
}

/*
 * Rótulo + controle + ajuda/erro, com a ligação aria pronta:
 * <FormField label="Nome" id="nome">{(p) => <Input {...p} />}</FormField>
 */
function FormField({
  label,
  id,
  hint,
  error,
  optional,
  className,
  children,
}: FormFieldProps) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = error ? errorId : hint ? hintId : undefined

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {optional && (
          <span className="ml-2 text-body-sm font-normal text-on-surface-variant">
            (opcional)
          </span>
        )}
      </Label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-2 text-body-sm font-semibold text-error"
        >
          <IconAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-body-sm text-on-surface-variant">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export { FormField }
