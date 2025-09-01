import Link from "next/link";
import { Logo } from "./logo";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm">
            Expert en menuiserie aluminium, Vitraf Alu vous apporte des solutions durables et esthétiques.
          </p>
          <p className="text-sm">Promoteur: <span className="font-semibold">Fidèle Alu</span></p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Navigation</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="#services" className="hover:text-primary transition-colors">Nos Services</Link>
            </li>
            <li>
              <Link href="#gallery" className="hover:text-primary transition-colors">Nos Réalisations</Link>
            </li>
             <li>
              <Link href="/shop" className="hover:text-primary transition-colors">Boutique</Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
            </li>
             <li>
              <Link href="/login" className="hover:text-primary transition-colors">Admin</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Contactez-nous</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-1 shrink-0" />
              <span>Abidjan Bingerville sur la voie de Adjin non loin de la Cité ADDOHA</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 shrink-0" />
              <div className="flex flex-col gap-1">
                <a href="tel:+2250160328808" className="hover:text-primary transition-colors">
                  +225 01 60 32 88 08
                </a>
                 <a href="tel:+2250718588156" className="hover:text-primary transition-colors">
                  +225 07 18 58 81 56
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Vitraf Alu. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
