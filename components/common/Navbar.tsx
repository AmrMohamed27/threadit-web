import Link from "next/link";
import Avatar from "./Avatar";
import { DarkModeToggle } from "./DarkModeToggle";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex justify-between items-center gap-8 mx-auto max-sm:px-4 h-16 container">
        <Link href="/" className="font-bold text-2xl">
          Threadit
        </Link>
        <SearchBar />
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <Avatar />
        </div>
      </div>
    </nav>
  );
}
