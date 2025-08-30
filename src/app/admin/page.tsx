import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactMessages, galleryImages } from "@/lib/data";
import { Images, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const unreadMessages = contactMessages.length;
    const galleryCount = galleryImages.length;
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
                <div className="text-2xl font-bold">{unreadMessages}</div>
                <p className="text-xs text-muted-foreground">messages non lus</p>
                 <Link href="/admin/messages" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">Voir les messages</Link>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Photos dans la galerie</CardTitle>
                <Images className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{galleryCount}</div>
                <p className="text-xs text-muted-foreground">photos publiées</p>
                <Link href="/admin/gallery" className="text-sm font-medium text-primary hover:underline mt-2 inline-block">Gérer la galerie</Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
