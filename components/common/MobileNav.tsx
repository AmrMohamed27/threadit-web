import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

const MobileNav = ({ handleLogin }: { handleLogin: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="flex md:hidden" variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant="ghost" onClick={handleLogin}>
            Log in
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="ghost">
            <Link href="/register">Create account</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  );
};

export default MobileNav;
