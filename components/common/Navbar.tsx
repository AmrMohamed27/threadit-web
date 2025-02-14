import Link from "next/link";
import Avatar from "./Avatar";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Threadit
        </Link>
        <div className="flex items-center space-x-4">
          <Avatar />
        </div>
      </div>
    </nav>
  );
}
