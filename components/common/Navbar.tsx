import Link from "next/link";
import Avatar from "./Avatar";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex justify-between items-center mx-auto max-sm:px-4 h-16 container">
        <Link href="/" className="font-bold text-2xl">
          Threadit
        </Link>
        <div className="flex items-center space-x-4">
          <Avatar />
        </div>
      </div>
    </nav>
  );
}
