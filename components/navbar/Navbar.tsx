"use client";
import { cn } from "@/lib/utils";
import ConfirmAlert from "../common/ConfirmAlert";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import NavbarActions from "./NavbarActions";
import NavbarLogo from "./NavbarLogo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { open, openMobile } = useSidebar();

  return (
    <nav
      className={cn(
        "top-0 z-50 fixed bg-background border-b",
        open ? "w-full md:w-[calc(100%-18rem)]" : "w-full"
      )}
    >
      <ConfirmAlert />
      <div className="flex justify-between items-center gap-8 mx-auto px-4 h-16 container">
        <div className="flex flex-row items-center gap-2">
          <SidebarTrigger className={cn(open ? "hidden" : "max-md:hidden")} />
          <SidebarTrigger className={cn(openMobile ? "hidden" : "md:hidden")} />
          <NavbarLogo />
        </div>
        <SearchBar hasPagination />
        <div className="flex items-center space-x-4">
          <NavbarActions />
        </div>
      </div>
    </nav>
  );
}
