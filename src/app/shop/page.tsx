
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getShopItems } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ShopItem = {
  id: string;
  src: string;
  name: string;
  price: number;
  description: string;
  aiHint?: string;
};

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const shopItems = await getShopItems();
      setItems(shopItems as ShopItem[]);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Notre Boutique
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Trouvez les pièces et accessoires dont vous avez besoin pour vos projets de menuiserie.
        </p>
      </div>

      <div className="my-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un article..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="aspect-[4/3] w-full object-cover"
                    data-ai-hint={item.aiHint}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                  <CardDescription className="text-sm min-h-[40px]">{item.description}</CardDescription>
                  <p className="text-xl font-bold text-primary my-2">
                    {item.price.toLocaleString("fr-FR")} XOF
                  </p>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>Aucun article ne correspond à votre recherche.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
