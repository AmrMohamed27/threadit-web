import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import MobileNav from "./MobileNav";

const NavbarLoggedOut = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center space-x-4">
        <Button className="bg-theme-red hover:bg-theme-red text-white">
          <Link href="/login">Log in</Link>
        </Button>
        <Button>
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center space-x-4">
        <MobileNav />
      </div>
    </>
  );
};

export default NavbarLoggedOut;
