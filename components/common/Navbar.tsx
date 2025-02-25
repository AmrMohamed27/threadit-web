import { DarkModeToggle } from "./DarkModeToggle";
import NavbarActions from "./NavbarActions";
import NavbarLogo from "./NavbarLogo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex justify-between items-center gap-8 mx-auto max-sm:px-4 h-16 container">
        <NavbarLogo />
        <SearchBar hasPagination />
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <NavbarActions />
        </div>
      </div>
    </nav>
  );
}
