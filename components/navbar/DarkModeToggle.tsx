"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="rounded-full w-[36px] h-[36px]" />;
  }
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Moon className="w-[1.2rem] h-[1.2rem]" />
      ) : (
        <Sun className="w-[1.2rem] h-[1.2rem]" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
