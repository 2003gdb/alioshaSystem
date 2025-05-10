"use client";
import { cn } from "@/lib/utils";
import { Mail, User, Phone, FileText, Globe, Search, Lock } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isFilled?: boolean;
  variant?: "default" | "email" | "name" | "phone" | "url" | "password" | "search" | "file";
  iconPosition?: "left" | "right";
  customIcon?: React.ReactNode;
}

export function FormInput({ 
  label, 
  error, 
  isFilled,
  className,
  variant = "default",
  iconPosition = "left",
  customIcon,
  ...props 
}: FormInputProps) {
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (variant) {
      case "email":
        return <Mail className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      case "name":
        return <User className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      case "phone":
        return <Phone className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      case "url":
        return <Globe className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      case "password":
        return <Lock className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      case "search":
        return <Search className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      case "file":
        return <FileText className="w-4 h-4 text-alioshaGrayLight group-hover/input:text-alioshaBlue transition-colors duration-200" />;
      default:
        return null;
    }
  };

  const hasIcon = (variant !== "default" && variant !== undefined) || customIcon;
  
  return (
    <div className="group">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      {hasIcon ? (
        <div className="flex group/input">
          {iconPosition === "left" && (
            <span className={cn(
              "inline-flex items-center justify-center w-10 text-sm border border-alioshaGrayLight rounded-s-sm border-e-0 bg-white",
              "transition-all duration-200",
              "group-hover/input:border-alioshaBlue",
              isFilled && "border-alioshaBlue/50"
            )}>
              {getIcon()}
            </span>
          )}
          <input
            className={cn(
              "border border-alioshaGrayLight bg-white text-black",
              iconPosition === "left" ? "rounded-e-sm rounded-s-none" : "rounded-s-sm rounded-e-none",
              "transition-all duration-200",
              "hover:border-alioshaBlue focus:outline-none focus:border-alioshaBlue ",
              "group-hover/input:border-alioshaBlue",
              "block flex-1 min-w-0 w-full px-3 py-2.5",
              isFilled && "border-alioshaBlue/50",
              className
            )}
            {...props}
          />
          {iconPosition === "right" && (
            <span className={cn(
              "inline-flex items-center justify-center w-10 border border-alioshaGrayLight rounded-e-sm border-s-0 bg-white",
              "transition-all duration-200",
              "group-hover/input:border-alioshaBlue",
              isFilled && "border-alioshaBlue/50"
            )}>
              {getIcon()}
            </span>
          )}
        </div>
      ) : (
        <input
          className={cn(
            "w-full bg-white border border-alioshaGrayLight text-black rounded-sm",
            "transition-all duration-200",
            "hover:border-alioshaBlue focus:outline-none focus:border-alioshaBlue/50 ",
            "py-2.5 px-3",
            isFilled && "border-alioshaBlue/50",
            className
          )}
          {...props}
        />
      )}
      {error && <p className="mt-1 text-sm text-alioshaRed">{error}</p>}
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isFilled?: boolean;
}

export function FormTextarea({ 
  label, 
  error, 
  isFilled,
  className,
  ...props 
}: FormTextareaProps) {
  return (
    <div className="group">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <textarea
        className={cn(
          "w-full px-3 py-2.5 border border-alioshaGrayLight bg-white text-black rounded-sm",
          "transition-all duration-200",
          "hover:border-alioshaBlue focus:outline-none focus:border-alioshaBlue focus:ring-1 focus:ring-alioshaBlue",
          isFilled && "border-alioshaBlue",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-alioshaRed">{error}</p>}
    </div>
  );
} 