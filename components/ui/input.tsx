import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-14 w-full min-w-0 rounded border border-outline bg-surface-container-lowest px-4 text-body-md text-on-surface transition-colors placeholder:text-placeholder disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-on-disabled aria-invalid:border-error",
        className
      )}
      {...props}
    />
  )
}

export { Input }
