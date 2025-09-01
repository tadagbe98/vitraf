"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getContactMessages } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";

type Message = {
  id: string;
  name: string;
  contact: string;
  location: string;
  work: string;
  date: Date;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const fetchedMessages = await getContactMessages();
      setMessages(fetchedMessages as Message[]);
      setLoading(false);
    }
    fetchMessages();
  }, []);

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
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : messages.length > 0 ? (
                messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(msg.date).toLocaleDateString("fr-FR")}</span>
                        <span className="text-xs text-muted-foreground">{new Date(msg.date).toLocaleTimeString("fr-FR")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{msg.name}</TableCell>
                    <TableCell>{msg.contact}</TableCell>
                    <TableCell>{msg.location}</TableCell>
                    <TableCell>{msg.work}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        Aucun message pour le moment.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
