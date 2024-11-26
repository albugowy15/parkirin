import * as React from "react";
import Link from "next/link";
import { Car } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold">ParkEase</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
