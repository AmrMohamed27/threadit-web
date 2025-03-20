import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  href: string;
  label: string;
  onClick: () => Promise<void>;
}

const GoBackButton = ({ href, label, onClick }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant={"grey"}
      className="flex flex-row justify-center items-center gap-2 max-w-[160px]"
      onClick={async () => {
        // First refetch with empty search term
        await onClick();
        // Then navigate, but don't include any search parameters
        router.push(href);
      }}
    >
      <ArrowLeft size={16} aria-label={`Go Back to ${label}`} />
      <span className="capitalize">{label}</span>
    </Button>
  );
};

export default GoBackButton;
