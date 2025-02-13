"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import Avatar from "./Avatar";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   Logout handler
  function handleLogout() {
    setIsLoggedIn(false);
  }
  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Threadit
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Avatar handleLogout={handleLogout} />
          ) : (
            <>
              {/* Desktop Navbar */}
              <div className="hidden md:flex items-center space-x-4">
                <DarkModeToggle />
                <Button variant="ghost">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button>
                  <Link href="/register">Create account</Link>
                </Button>
              </div>
              {/* Mobile Navbar */}
              <div className="flex md:hidden space-x-4 items-center">
                <DarkModeToggle />
                <MobileNav />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
