import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CustomButtonPropsType = {
  children: ReactNode;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function CustomButton({
  children,
  handleClick,
  type,
  className
}: CustomButtonPropsType) {
  return (
    <button
      type={type}
      className={cn("px-5 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700", className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
