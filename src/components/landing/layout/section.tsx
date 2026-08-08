import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "w-full relative",
  {
    variants: {
      padding: {
        none: "",
        sm: "py-8 md:py-12",
        md: "py-16 md:py-24",
        lg: "py-24 md:py-32",
      },
      background: {
        default: "bg-background",
        muted: "bg-muted/50",
        transparent: "bg-transparent",
      },
      divider: {
        none: "",
        top: "border-t border-border",
        bottom: "border-b border-border",
        both: "border-y border-border",
      },
    },
    defaultVariants: {
      padding: "md",
      background: "default",
      divider: "none",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType
  id?: string
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, background, divider, as: Component = "section", id, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        id={id}
        className={cn(sectionVariants({ padding, background, divider, className }))}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"
