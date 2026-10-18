import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "block min-h-30 w-full resize-y rounded border border-outline bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface transition-colors placeholder:text-placeholder disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-on-disabled aria-invalid:border-error",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
