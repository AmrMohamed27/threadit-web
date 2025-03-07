import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  label: string;
}

const GoBackButton = ({ href, label }: Props) => {
  return (
    <Link
      className="flex flex-row justify-center items-center gap-2 bg-muted hover:bg-muted-foreground/30 px-4 py-2 rounded-full max-w-[160px] text-sm"
      href={href}
    >
      <ArrowLeft size={16} aria-label={`Go Back to ${label}`} />
      <span className="capitalize">{label}</span>
    </Link>
  );
};

export default GoBackButton;
