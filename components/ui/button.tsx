import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-md font-medium ring-offset-background transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-alioshaBlack text-alioshaWhite hover:bg-transparent hover:bg-alioshaRed/80 ",
        yellow:
          "rounded-md border border-alioshaBlack bg-transparent text-alioshaBlack hover:bg-alioshaYellow/80 hover:text-alioshaWhite hover:border-transparent",
        blue:
          "bg-alioshaBlue text-alioshaWhite hover:bg-alioshaBlue/80 hover:scale-105 transition-all duration-300"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  hoverIcon?: React.ComponentType<{ className?: string }>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, hoverIcon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasHoverIcon = !!hoverIcon

    if (hasHoverIcon && hoverIcon) {
      const HoverIconComponent = hoverIcon
      
      return (
        <Comp
          className={cn(
            buttonVariants({ variant, size }),
            "overflow-hidden [&:hover_.hover-icon]:w-5 [&:hover_.hover-icon]:opacity-100 [&:hover_.hover-icon]:mr-1 pl-4 pr-2",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
          <div className="hover-icon w-0 opacity-0 transition-all duration-400 ml-2">
            <HoverIconComponent className="h-8 w-8" />
          </div>
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
