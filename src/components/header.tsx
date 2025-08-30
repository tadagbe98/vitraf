"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone } from "lucide-react";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Réalisations" },
  { href: "#about", label: "À Propos" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile: boolean) => (
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={pathname === "/" ? link.href : `/${link.href}`}
        className={cn(
          "transition-colors hover:text-primary",
          isMobile ? "text-lg py-2" : "text-sm font-medium"
        )}
      >
        {link.label}
      </Link>
    ))
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex gap-6 mx-auto">
          {renderNavLinks(false)}
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex items-center gap-2">
            <a href="tel:+2250160328808">
              <Phone className="h-4 w-4" />
              +225 01 60 32 88 08
            </a>
          </Button>
          <Button asChild>
            <Link href="#contact">Devis Gratuit</Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col p-6">
                  <Logo />
                  <nav className="flex flex-col gap-4 mt-8">
                    {renderNavLinks(true)}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
