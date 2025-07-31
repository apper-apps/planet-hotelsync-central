import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-navy-100 text-navy-800 border-navy-200",
    occupied: "bg-red-100 text-red-800 border-red-200",
    vacant: "bg-green-100 text-green-800 border-green-200",
    cleaning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    maintenance: "bg-orange-100 text-orange-800 border-orange-200",
    outline: "border-gray-300 text-gray-700 bg-transparent"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge