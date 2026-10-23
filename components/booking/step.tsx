import * as React from "react";

import { cn } from "@/lib/utils";
import { IconCheck } from "@/components/icons";

type StepProps = {
  status: "done" | "current" | "upcoming";
  title: string;
  /** Ícone da etapa (usado na etapa atual) */
  icon: React.ReactNode;
  className?: string;
};

/* O título já inclui o número ("1. Tipo de atendimento"). Etapa do agendamento: Concluída / Atual / Futura (nunca só pela cor) */
export function Step({ status, title, icon, className }: StepProps) {
  return (
    <li
      aria-current={status === "current" ? "step" : undefined}
      className={cn("flex items-center gap-3", className)}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded [&_svg]:size-6",
          status === "done" && "bg-secondary text-on-secondary",
          status === "current" && "bg-primary text-on-primary",
          status === "upcoming" &&
            "bg-surface-container-high text-on-surface-variant",
        )}
      >
        {status === "done" ? <IconCheck /> : icon}
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "text-body-md",
            status === "current" && "font-bold text-primary",
            status === "done" && "text-on-surface",
            status === "upcoming" && "text-on-surface-variant",
          )}
        >
          {title}
        </span>
        {status === "done" ? (
          <span className="text-body-sm text-secondary">Concluído</span>
        ) : null}
        {status === "current" ? (
          <span className="text-body-sm text-secondary">Você está aqui</span>
        ) : null}
        {status === "upcoming" ? (
          <span className="text-body-sm text-on-surface-variant">A seguir</span>
        ) : null}
      </span>
    </li>
  );
}

/* Lista ordenada de etapas */
export function Stepper({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn("flex flex-col gap-4 md:flex-row md:gap-8", className)}
      {...props}
    />
  );
}
