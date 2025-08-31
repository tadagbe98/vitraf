"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addGalleryItem, getGalleryImages, deleteGalleryItem } from "@/lib/actions";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  description: string;
  aiHint?: string;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const fetchedImages = await getGalleryImages();
      setImages(fetchedImages as GalleryImage[]);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les images. Vérifiez vos règles de sécurité Firestore." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryItem(id);
      toast({ title: "Succès", description: "Image supprimée." });
      fetchImages();
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer l'image." });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    
    const fileInput = event.currentTarget.elements.namedItem('picture') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
        if (file.size > 8 * 1024 * 1024) { // 8MB limit
            toast({ variant: "destructive", title: "Erreur", description: "Le fichier est trop volumineux. La taille maximale est de 8 Mo." });
            setIsSubmitting(false);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Src = reader.result as string;
            const itemData = {
                alt: values.alt as string,
                category: values.category as string,
                description: values.description as string,
                src: base64Src,
                aiHint: "custom image"
            };

            try {
                const result = await addGalleryItem(itemData);
                if (result.success) {
                  toast({ title: "Succès", description: "Réalisation ajoutée." });
                  fetchImages();
                  setDialogOpen(false);
                } else {
                   const errorMessages = result.errors ? Object.entries(result.errors).map(([field, fieldErrors]) => `${field}: ${fieldErrors._errors.join(', ')}`).join('; ') : "Erreur inconnue.";
                   toast({ variant: "destructive", title: "Erreur de validation", description: errorMessages });
                }
            } catch (error) {
                toast({ variant: "destructive", title: "Erreur", description: "Impossible d'ajouter la réalisation. Vérifiez la console pour plus de détails." });
                 console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        };
        reader.onerror = error => {
            console.error(error);
            toast({ variant: "destructive", title: "Erreur", description: "Erreur lors de la lecture du fichier." });
            setIsSubmitting(false);
        }
    } else {
         toast({ variant: "destructive", title: "Erreur", description: "Veuillez sélectionner une image." });
         setIsSubmitting(false);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gérer la Galerie</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                Uploadez une image et ajoutez les détails de votre nouvelle réalisation. Taille max: 8Mo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="picture">Image</Label>
                  <Input id="picture" name="picture" type="file" required accept="image/*" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="category">Catégorie</Label>
                  <Input id="category" name="category" type="text" placeholder="Ex: Fenêtres" required />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="alt">Titre (Alt text)</Label>
                  <Input id="alt" name="alt" type="text" placeholder="Ex: Fenêtre coulissante" required />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Ex: Fenêtre coulissante pour villa moderne." required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sauvegarder
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
             <Card key={i}><CardContent className="p-0"><Skeleton className="aspect-[4/3] w-full rounded-t-lg" /></CardContent><CardHeader className="p-4 space-y-2"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-8 w-full" /></CardHeader><CardFooter className="p-4 pt-0 flex justify-end"><Skeleton className="h-9 w-9 rounded-full" /></CardFooter></Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
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
                <Button variant="destructive" size="icon" onClick={() => handleDelete(image.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
