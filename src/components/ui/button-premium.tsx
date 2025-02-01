import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonPremiumProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const ButtonPremium = React.forwardRef<HTMLButtonElement, ButtonPremiumProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg hover:from-gray-800 hover:to-gray-700":
              variant === "default",
            "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "h-9 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-8": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonPremium.displayName = "ButtonPremium";

export { ButtonPremium };