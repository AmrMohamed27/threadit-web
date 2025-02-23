import { FieldError } from "@/generated/graphql";
import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toErrorMap(errors: FieldError[]) {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
}

export const createQueryStringFn = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  return params.toString();
};

export const createMultipleQueryStringsFn = ({
  names,
  values,
  searchParams,
}: {
  names: string[];
  values: string[];
  searchParams: ReadonlyURLSearchParams;
}) => {
  const params = new URLSearchParams(searchParams.toString());
  for (let i = 0; i < names.length; i++) {
    params.set(names[i], values[i]);
  }
  return params.toString();
};

export function timeAgo(timestamp: string): string {
  const now = Date.now();
  const date = new Date(parseInt(timestamp, 10)); // Convert string to number
  const secondsAgo = Math.floor((now - date.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function copyLinkToClipboard(link: string, then: () => void): void {
  navigator.clipboard
    .writeText(link)
    .then(then)
    .catch((err) => {
      console.error("Failed to copy link: ", err);
    });
}

interface defaultAvatarProps {
  name?: string;
}

export const getDefaultAvatar = ({
  name = "Anonymous",
}: defaultAvatarProps) => {
  const [firstName, lastName] = name.split(" ");
  return `https://ui-avatars.com/api/?name=${firstName}+${
    lastName ?? firstName.charAt(1)
  }&background=7f96dc&color=ffffff`;
};

export const isArabic = (text: string) => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return arabicRegex.test(text);
};
