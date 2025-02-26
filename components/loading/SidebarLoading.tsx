import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const SidebarLoading = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props} className="px-4">
      <SidebarHeader>
        <Link href="/" className="font-bold text-2xl">
          Threadit
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-4 mt-12">
        <Skeleton className="rounded-lg w-full h-12" />
        <Skeleton className="rounded-lg w-full h-12" />
        <Skeleton className="rounded-lg w-full h-12" />
        <Skeleton className="rounded-lg w-full h-64" />
        <Skeleton className="rounded-lg w-full h-64" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarLoading;
