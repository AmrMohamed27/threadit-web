"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "../ui/sidebar";
import { DarkModeToggle } from "./DarkModeToggle";
import NavbarActions from "./NavbarActions";
import NavbarLogo from "./NavbarLogo";
import SearchBar from "./SearchBar";
import ConfirmAlert from "../common/ConfirmAlert";

export default function Navbar() {
  const { open } = useSidebar();
  return (
    <nav
      className={cn(
        "top-0 z-50 fixed bg-background border-b",
        open ? "w-full md:w-[calc(100%-18rem)]" : "w-full"
      )}
    >
      <ConfirmAlert />
      <div className="flex justify-between items-center gap-8 mx-auto px-4 h-16 container">
        <NavbarLogo />
        <SearchBar hasPagination />
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <NavbarActions />
        </div>
      </div>
    </nav>
  );
}
