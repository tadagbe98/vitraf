
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getShopItems } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { ShopItem } from "@/hooks/use-cart";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const shopItems = await getShopItems();
      setItems(shopItems as ShopItem[]);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const handleAddToCart = (item: ShopItem) => {
    addItem(item);
    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier.`,
    });
  };

  const categories = ["Toutes", ...Array.from(new Set(items.map((item) => item.category)))];

  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedCategory === "Toutes" ? true : item.category === selectedCategory
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
      
      {!loading && items.length > 0 && (
         <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
        </div>
      )}


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
              <Card key={item.id} className="group overflow-hidden flex flex-col">
                 <Dialog>
                    <DialogTrigger asChild>
                        <CardHeader className="p-0 overflow-hidden cursor-pointer">
                        <Image
                            src={item.src}
                            alt={item.name}
                            width={400}
                            height={300}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            data-ai-hint={item.aiHint}
                        />
                        </CardHeader>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[60vw] p-0">
                        <DialogTitle className="sr-only">{item.name}</DialogTitle>
                        <DialogDescription className="sr-only">{item.description}</DialogDescription>
                        <Image
                        src={item.src}
                        alt={item.name}
                        width={1200}
                        height={900}
                        className="w-full h-auto object-contain rounded-lg"
                        />
                    </DialogContent>
                </Dialog>
                <CardContent className="p-4 flex flex-col flex-1">
                  <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                  <Badge variant="secondary">{item.category}</Badge>
                  <CardDescription className="text-sm min-h-[40px] flex-grow whitespace-pre-wrap pt-2">{item.description}</CardDescription>
                  <p className="text-xl font-bold text-primary my-2">
                    {item.price.toLocaleString("fr-FR")} XOF
                  </p>
                  <Button className="w-full mt-auto" onClick={() => handleAddToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>Aucun article ne correspond à votre recherche ou à cette catégorie.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
