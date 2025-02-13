import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu } from "lucide-react";

const MobileNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex md:hidden">
        <div className="p-2 border-[1px] rounded-md">
          <Menu size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/login">Log in</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/register">Create account</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
