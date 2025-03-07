import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const GreyDiv = ({ children, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "bg-muted hover:bg-muted-foreground/30 rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GreyDiv;
