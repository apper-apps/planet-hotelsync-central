import React from "react"
import { cn } from "@/utils/cn"

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]",
      className
    )}
    {...props}
  >
    {children}
  </div>
))

Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-xl font-semibold leading-none tracking-tight text-navy-700", className)}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }