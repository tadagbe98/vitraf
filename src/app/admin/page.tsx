"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactMessages, getGalleryImages, getShopItems } from "@/lib/actions";
import { Images, MessageSquare, ShoppingCart, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ messages: 0, gallery: 0, products: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            const [messages, gallery, products] = await Promise.all([
                getContactMessages(),
                getGalleryImages(),
                getShopItems(),
            ]);
            setStats({ messages: messages.length, gallery: gallery.length, products: products.length });
            setLoading(false);
        }
        fetchStats();
    }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <p className="text-muted-foreground">Bienvenue, Fidèle Alu. Voici un aperçu de votre site.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{stats.messages}</div>}
                <p className="text-xs text-muted-foreground">messages reçus</p>
                 <Link href="/admin/messages" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">Voir les messages</Link>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Photos dans la galerie</CardTitle>
                <Images className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{stats.gallery}</div>}
                <p className="text-xs text-muted-foreground">photos publiées</p>
                <Link href="/admin/gallery" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">Gérer la galerie</Link>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produits en boutique</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{stats.products}</div>}
                <p className="text-xs text-muted-foreground">articles en vente</p>
                <Link href="/admin/shop" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">Gérer la boutique</Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
