"use client";

import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

const NavbarLogo = () => {
  const { state } = useSidebar();
  return state === "collapsed" ? (
    <Link href="/" className="font-bold text-2xl">
      Threadit
    </Link>
  ) : (
    // Empty div to keep the search bar centered
    <div className=""></div>
  );
};

export default NavbarLogo;
