import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarContainer,
} from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  loading?: boolean;
  className?: string;
}

const AvatarWrapper = ({ src, loading, alt, className = "" }: Props) => {
  return (
    <AvatarContainer className={cn("", className)}>
      {loading ? <Skeleton /> : <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>
        <Skeleton />
      </AvatarFallback>
    </AvatarContainer>
  );
};

export default AvatarWrapper;
