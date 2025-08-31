import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/data";
import { PlusCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";


export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gérer la Galerie</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une réalisation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle réalisation</DialogTitle>
              <DialogDescription>
                Uploadez une image et ajoutez les détails de votre nouvelle réalisation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">Image</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="category">Catégorie</Label>
                <Input id="category" type="text" placeholder="Ex: Fenêtres" />
              </div>
               <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="alt">Titre (Alt text)</Label>
                <Input id="alt" type="text" placeholder="Ex: Fenêtre coulissante" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Ex: Fenêtre coulissante pour villa moderne." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <Card key={image.id}>
            <CardContent className="p-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="aspect-[4/3] w-full object-cover rounded-t-lg"
                data-ai-hint={image.aiHint}
              />
            </CardContent>
            <CardHeader className="p-4">
              <CardTitle className="text-base">{image.alt}</CardTitle>
              <Badge variant="outline" className="w-fit mt-1">{image.category}</Badge>
              <CardDescription className="text-xs pt-2">{image.description}</CardDescription>
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
