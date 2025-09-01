"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, Phone, ShoppingCart } from "lucide-react";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "./ui/badge";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Réalisations" },
  { href: "/shop", label: "Boutique" },
  { href: "#about", label: "À Propos" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { itemCount, isAnimating, isClient } = useCart();

  const renderNavLinks = (isMobile: boolean, onLinkClick?: () => void) => (
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href.startsWith("#") && pathname !== "/" ? `/${link.href}` : link.href}
        className={cn(
          "transition-colors hover:text-primary",
          isMobile ? "text-lg py-2" : "text-sm font-medium"
        )}
        onClick={onLinkClick}
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

           <div className="relative">
             <Button variant="outline" size="icon" asChild className={cn(isAnimating && "animate-shake")}>
               <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Panier</span>
              </Link>
            </Button>
            {isClient && itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{itemCount}</Badge>
            )}
          </div>
          
          <Button asChild className="hidden md:flex">
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
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">Navigation principale du site</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col p-6">
                  <div className="mb-8">
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-4">
                    {renderNavLinks(true, () => {
                      // Small hack to close sheet on nav link click
                      const closeButton = document.querySelector(
                        "[data-radix-dialog-content] > [data-radix-dialog-close]"
                      );
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    })}
                  </nav>
                   <Button asChild className="mt-8">
                    <Link href="#contact">Devis Gratuit</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
