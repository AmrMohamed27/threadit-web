"use client";

import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

const NavbarLogo = () => {
  const { open, openMobile } = useSidebar();
  return (
    <>
      {!open ? (
        <Link href="/" className="max-md:hidden font-bold text-2xl">
          Threadit
        </Link>
      ) : (
        // Empty div to keep the search bar centered
        <div className=""></div>
      )}
      {/* Mobile Title */}
      {!openMobile ? (
        <Link href="/" className="md:hidden font-bold text-xl">
          Threadit
        </Link>
      ) : (
        // Empty div to keep the search bar centered
        <div className=""></div>
      )}
    </>
  );
};

export default NavbarLogo;
