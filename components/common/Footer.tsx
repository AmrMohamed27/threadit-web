import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-6 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold">About</h3>
            <ul className="text-sm text-muted-foreground">
              <li>
                <Link href="/about">About Threadit</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Press</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Help</h3>
            <ul className="text-sm text-muted-foreground">
              <li>
                <Link href="#">Threadit Help</Link>
              </li>
              <li>
                <Link href="#">Threadit Coins</Link>
              </li>
              <li>
                <Link href="#">Threadit Premium</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Communities</h3>
            <ul className="text-sm text-muted-foreground">
              <li>
                <Link href="#">Popular</Link>
              </li>
              <li>
                <Link href="#">Topics</Link>
              </li>
              <li>
                <Link href="#">Rules</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Policies</h3>
            <ul className="text-sm text-muted-foreground">
              <li>
                <Link href="#">User Agreement</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Content Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Threadit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
