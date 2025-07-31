import React from "react"
import { cn } from "@/utils/cn"

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-gradient-to-r from-navy-500 to-navy-600 text-white hover:from-navy-600 hover:to-navy-700 focus-visible:ring-navy-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    secondary: "bg-white text-navy-600 border-2 border-navy-200 hover:bg-navy-50 hover:border-navy-300 focus-visible:ring-navy-500 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    accent: "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 focus-visible:ring-amber-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    ghost: "text-navy-600 hover:bg-navy-50 hover:text-navy-700 focus-visible:ring-navy-500",
    outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-500"
  }
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button