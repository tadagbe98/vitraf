
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, DoorOpen, Phone, RectangleHorizontal, MapPin, Loader2 } from 'lucide-react';
import { getGalleryImages } from '@/lib/actions';
import { ContactForm } from '@/components/contact-form';
import { Badge } from '@/components/ui/badge';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  description: string;
  aiHint?: string;
};

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleImages, setVisibleImages] = useState(8);

  useEffect(() => {
    async function loadImages() {
      try {
        const images = await getGalleryImages();
        setGalleryImages(images as GalleryImage[]);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  const showMoreImages = () => {
    setVisibleImages(galleryImages.length);
  };
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section id="hero" className="relative h-screen w-full">
          <Image
            src="/images/carou.jpg"
            alt="Chantier de menuiserie aluminium"
            fill
            className="object-cover"
            priority
            data-ai-hint="modern architecture window"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Vitraf Alu
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl mt-4">
              L'excellence en menuiserie aluminium. Qualité, prestige et design moderne pour vos projets.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="#contact">Demander un devis</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#gallery">Nos réalisations</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="services" className="bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Nos Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Nous concevons et installons des solutions en aluminium sur mesure pour les particuliers et les professionnels.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <RectangleHorizontal className="h-12 w-12 text-primary" />
                  <CardTitle className="mt-4">Fenêtres en Aluminium</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  Des fenêtres robustes, isolantes et esthétiques qui s'adaptent à tous les styles architecturaux.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <DoorOpen className="h-12 w-12 text-primary" />
                  <CardTitle className="mt-4">Portes sur Mesure</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  Portes d'entrée, portes de service ou portes-fenêtres, alliant sécurité et design moderne.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Building2 className="h-12 w-12 text-primary" />
                  <CardTitle className="mt-4">Façades et Baies Vitrées</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  Transformez vos espaces avec des façades et baies vitrées qui maximisent la lumière et l'élégance.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Nos Réalisations</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Découvrez quelques-uns de nos projets terminés. La qualité de notre travail parle d'elle-même.
              </p>
            </div>
             {loading ? (
                <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                </div>
             ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                    {galleryImages.slice(0, visibleImages).map((image) => (
                        <div key={image.id} className="group relative overflow-hidden rounded-lg">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            data-ai-hint={image.aiHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <Badge variant="secondary" className="mb-2">{image.category}</Badge>
                            <p className="font-semibold text-sm">{image.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                    {visibleImages < galleryImages.length && (
                        <div className="text-center mt-12">
                            <Button onClick={showMoreImages}>Voir plus de réalisations</Button>
                        </div>
                    )}
                </>
             )}
          </div>
        </section>

        <section id="about" className="bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">À Propos de Nous</h2>
                <p className="mt-4 text-muted-foreground">
                  Fondée par <span className="font-semibold text-primary">Fidèle Alu</span>, un passionné avec des années d'expérience, Vitraf Alu est une entreprise dédiée à la fourniture de solutions de menuiserie aluminium de première qualité. Notre mission est de combiner l'artisanat traditionnel avec les technologies modernes pour créer des produits durables, fonctionnels et esthétiquement agréables.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Nous sommes basés à Bingerville, Abidjan, et nous sommes fiers de servir notre communauté avec intégrité et professionnalisme.
                </p>
              </div>
              <div className="relative h-[800px] w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/apropos.jpg"
                  alt="Artisan menuisier travaillant sur un cadre en aluminium"
                  className="object-cover"
                  fill
                  data-ai-hint="craftsman workshop"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Contactez-nous</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Vous avez un projet en tête ? Remplissez le formulaire ou appelez-nous directement pour obtenir un devis gratuit.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Informations de contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <a href="tel:+2250160328808" className="text-lg hover:underline">
                      +225 01 60 32 88 08
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <p className="text-lg">Bingerville, Abidjan, Côte d'Ivoire</p>
                  </div>
                </div>
                <div className="h-[600px] w-full rounded-lg bg-muted overflow-hidden">
                   <Image src="/images/contact.jpg" alt="Carte de localisation de l'atelier à Abidjan" className="h-full w-full object-cover" width={600} height={400} data-ai-hint="map abidjan" />
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
