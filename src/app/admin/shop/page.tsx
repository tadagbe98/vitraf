import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shopItems } from "@/lib/data";
import { PlusCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminShopPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gérer la Boutique</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel article</DialogTitle>
              <DialogDescription>
                Uploadez une image et ajoutez les détails de votre nouvel article.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">Image</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nom de l'article</Label>
                <Input id="name" type="text" placeholder="Ex: Charnière" />
              </div>
               <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price">Prix (XOF)</Label>
                <Input id="price" type="number" placeholder="Ex: 5000" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Ex: Charnière en inox pour porte." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shopItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-0">
              <Image
                src={item.src}
                alt={item.name}
                width={400}
                height={300}
                className="aspect-[4/3] w-full object-cover rounded-t-lg"
                data-ai-hint={item.aiHint}
              />
            </CardContent>
            <CardHeader className="p-4">
              <CardTitle className="text-base">{item.name}</CardTitle>
              <p className="font-semibold text-primary">{item.price.toLocaleString("fr-FR")} XOF</p>
              <CardDescription className="text-xs pt-2">{item.description}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex justify-end">
                <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
