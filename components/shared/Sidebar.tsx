"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={36}
            height={36}
          />
          <h2 className="font-bold text-3xl">Magecraft</h2>
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={cn("sidebar-nav_element group", {
                      "bg-purple-gradient text-white": isActive,
                      "text-gray-700": !isActive,
                    })}
                  >
                    <Link href={link.route} className="sidebar-link">
                      <Image
                        src={link.icon}
                        alt="nav element icon"
                        width={24}
                        height={24}
                        className={cn({ "brightness-200": isActive })}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={cn("sidebar-nav_element group", {
                      "bg-purple-gradient text-white": isActive,
                      "text-gray-700": !isActive,
                    })}
                  >
                    <Link href={link.route} className="sidebar-link">
                      <Image
                        src={link.icon}
                        alt="nav element icon"
                        width={24}
                        height={24}
                        className={cn({ "brightness-200": isActive })}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
