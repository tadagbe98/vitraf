import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { contactMessages } from "@/lib/data";

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages des Clients</h1>
      <Card>
        <CardHeader>
          <CardTitle>Boîte de réception</CardTitle>
          <CardDescription>
            Voici les messages envoyés depuis le formulaire de contact de votre site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead className="w-[40%]">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactMessages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>
                    <div className="flex flex-col">
                        <span>{msg.date.toLocaleDateString("fr-FR")}</span>
                        <span className="text-xs text-muted-foreground">{msg.date.toLocaleTimeString("fr-FR")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{msg.name}</TableCell>
                  <TableCell>{msg.contact}</TableCell>
                  <TableCell>{msg.location}</TableCell>
                  <TableCell>{msg.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
