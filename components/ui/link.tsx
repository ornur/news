import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const linkVariants = cva(
    "text-primary underline-offset-4 hover:underline text-xs",
    {
        variants: {
        size: {
            default: "text-sm",
            lg: "text-lg",
        },
        },
        defaultVariants: {
        size: "default",
        },
    }
    )
export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
        VariantProps<typeof linkVariants> {
    asChild?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"
    return (
        <Comp
        className={cn(linkVariants({ size, className }))}
        ref={ref}
        {...props}
        />
    )
    }
)
Link.displayName = "Link"

export { Link, linkVariants }