"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitOrder } from "@/lib/actions";

export default function CartPage() {
  const { cartItems, removeItem, updateItemQuantity, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const orderData = {
      customerName: values.name as string,
      customerPhone: values.phone as string,
      customerAddress: values.address as string,
      items: cartItems,
      total: cartTotal,
    };
    
    try {
      const result = await submitOrder(orderData);
      if (result.success) {
        toast({
          title: "Commande réussie !",
          description: "Merci pour votre confiance. Nous vous contacterons bientôt.",
        });
        clearCart();
        setDialogOpen(false);
      } else {
        const errorMessages = result.errors ? Object.entries(result.errors).map(([field, fieldErrors]) => `${field}: ${fieldErrors._errors.join(', ')}`).join('; ') : "Erreur inconnue.";
        toast({ variant: "destructive", title: "Erreur de validation", description: errorMessages });
      }
    } catch (error) {
       toast({ variant: "destructive", title: "Erreur", description: "Impossible de passer la commande." });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-center">
          Votre Panier
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Votre panier est vide</h2>
          <p className="mt-2 text-muted-foreground">
            Parcourez notre boutique pour trouver les articles dont vous avez besoin.
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la boutique
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead className="text-center">Quantité</TableHead>
                      <TableHead className="text-right">Prix Unitaire</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="hidden md:table-cell">
                          <Image
                            src={item.src}
                            alt={item.name}
                            width={80}
                            height={60}
                            className="rounded-md object-cover aspect-[4/3]"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                              className="h-8 w-16 text-center"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.price.toLocaleString("fr-FR")} XOF
                        </TableCell>
                        <TableCell className="text-right">
                          {(item.price * item.quantity).toLocaleString("fr-FR")} XOF
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
             <Button variant="outline" asChild className="mt-6">
                <Link href="/shop">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continuer les achats
                </Link>
             </Button>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{cartTotal.toLocaleString("fr-FR")} XOF</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>À calculer</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>{cartTotal.toLocaleString("fr-FR")} XOF</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      Passer la commande
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Finaliser la commande</DialogTitle>
                      <DialogDescription>
                        Veuillez fournir vos informations pour la livraison.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCheckout}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nom
                          </Label>
                          <Input id="name" name="name" required className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Téléphone
                          </Label>
                          <Input id="phone" name="phone" required className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">
                            Adresse
                          </Label>
                          <Textarea id="address" name="address" required className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Confirmer la commande
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
