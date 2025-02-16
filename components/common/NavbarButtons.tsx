import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import MobileNav from "./MobileNav";

const NavbarButtons = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="ghost">
          <Link href="/login">Log in</Link>
        </Button>
        <Button>
          <Link href="/register">Create account</Link>
        </Button>
      </div>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center space-x-4">
        <MobileNav />
      </div>
    </>
  );
};

export default NavbarButtons;
