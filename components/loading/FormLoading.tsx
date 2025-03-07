import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  heading: string;
};

const FormLoading = (props: Props) => {
  // Destructure props
  const { heading } = props;
  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <h1 className="text-lg">{heading}</h1>
      <div className="flex flex-col gap-4 space-y-8 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
        ))}
        <Skeleton className="w-20 h-8" />
      </div>
    </div>
  );
};

export default FormLoading;
