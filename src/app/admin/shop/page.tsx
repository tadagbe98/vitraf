
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addShopItem, getShopItems, deleteShopItem, updateShopItem } from "@/lib/actions";
import { PlusCircle, Trash2, Loader2, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type ShopItem = {
  id: string;
  src: string;
  name: string;
  price: number;
  description: string;
  aiHint?: string;
};

export default function AdminShopPage() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const fetchedItems = await getShopItems();
      setItems(fetchedItems as ShopItem[]);
    } catch (error) {
      console.error("Failed to fetch shop items:", error);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les articles. Vérifiez vos règles de sécurité Firestore." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenDialog = (item: ShopItem | null = null) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteShopItem(id);
      toast({ title: "Succès", description: "Article supprimé." });
      fetchItems();
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer l'article." });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const fileInput = event.currentTarget.elements.namedItem('picture') as HTMLInputElement;
    const file = fileInput.files?.[0];

    const processSubmit = async (base64Src: string | undefined) => {
      const itemData = {
        id: editingItem?.id,
        name: values.name as string,
        price: Number(values.price),
        description: values.description as string,
        src: base64Src || editingItem?.src,
        aiHint: "custom item"
      };

      try {
        let result;
        if (editingItem) {
          result = await updateShopItem(itemData as ShopItem & { id: string });
        } else {
          result = await addShopItem(itemData);
        }

        if (result.success) {
          toast({ title: "Succès", description: `Article ${editingItem ? 'modifié' : 'ajouté'}.` });
          fetchItems();
          handleCloseDialog();
        } else {
          const errorMessages = result.errors ? Object.entries(result.errors).map(([field, fieldErrors]) => `${field}: ${fieldErrors._errors.join(', ')}`).join('; ') : "Erreur inconnue.";
          toast({ variant: "destructive", title: "Erreur de validation", description: errorMessages });
        }
      } catch (error) {
        toast({ variant: "destructive", title: "Erreur", description: `Impossible de ${editingItem ? 'modifier' : 'ajouter'} l'article.` });
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };
    
    if (file) {
      if (file.size > 8 * 1024 * 1024) { // 8MB limit
        toast({ variant: "destructive", title: "Erreur", description: "Le fichier est trop volumineux. La taille maximale est de 8 Mo." });
        setIsSubmitting(false);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => processSubmit(reader.result as string);
      reader.onerror = (error) => {
        console.error(error);
        toast({ variant: "destructive", title: "Erreur", description: "Erreur lors de la lecture du fichier." });
        setIsSubmitting(false);
      };
    } else {
      if (editingItem) {
        processSubmit(undefined);
      } else {
        toast({ variant: "destructive", title: "Erreur", description: "Veuillez sélectionner une image." });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gérer la Boutique</h1>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un article
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[525px]" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={handleCloseDialog}>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Modifier l'article" : "Ajouter un nouvel article"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Modifiez les détails de cet article." : "Uploadez une image et ajoutez les détails de votre nouvel article. Taille max: 8Mo."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="picture">Image</Label>
                  <Input id="picture" name="picture" type="file" accept="image/*" required={!editingItem} />
                  {editingItem?.src && <Image src={editingItem.src} alt={editingItem.name} width={80} height={60} className="mt-2 rounded-md object-cover" />}
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Nom de l'article</Label>
                  <Input id="name" name="name" type="text" placeholder="Ex: Charnière" required defaultValue={editingItem?.name} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="price">Prix (XOF)</Label>
                  <Input id="price" name="price" type="number" placeholder="Ex: 5000" required defaultValue={editingItem?.price} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Ex: Charnière en inox pour porte." required defaultValue={editingItem?.description} />
                </div>
              </div>
              <DialogFooter>
                 <Button type="button" variant="outline" onClick={handleCloseDialog}>Annuler</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sauvegarder
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
      </Dialog>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
             <Card key={i}><CardContent className="p-0"><Skeleton className="aspect-[4/3] w-full rounded-t-lg" /></CardContent><CardHeader className="p-4 space-y-2"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-5 w-1/2" /><Skeleton className="h-8 w-full" /></CardHeader><CardFooter className="p-4 pt-0 flex justify-end gap-2"><Skeleton className="h-9 w-9" /><Skeleton className="h-9 w-9 rounded-full" /></CardFooter></Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
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
                <CardDescription className="text-xs pt-2 whitespace-pre-wrap">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                 <Button variant="outline" size="icon" onClick={() => handleOpenDialog(item)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Modifier</span>
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
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

