import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<React.ElementRef<"img">, React.ComponentPropsWithoutRef<"img">>(
  ({ className, ...props }, ref) => {
    return <img ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
  },
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<React.ElementRef<"span">, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium", className)}
        {...props}
      />
    )
  },
)
AvatarFallback.displayName = "AvatarFallback"

export const AvatarInitials = () => null

export { Avatar, AvatarImage, AvatarFallback }
