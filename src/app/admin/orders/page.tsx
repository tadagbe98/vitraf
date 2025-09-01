"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrders } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import type { CartItem } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  status: string;
  date: Date;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders as Order[]);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Commandes Clients</h1>
      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes</CardTitle>
          <CardDescription>
            Voici les commandes passées depuis la boutique de votre site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50%]">Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{new Date(order.date).toLocaleDateString("fr-FR")}</span>
                        <span className="text-xs text-muted-foreground">{new Date(order.date).toLocaleTimeString("fr-FR")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                        <div className="text-xs text-muted-foreground">{order.customerAddress}</div>
                    </TableCell>
                    <TableCell className="font-bold">
                      {order.total.toLocaleString("fr-FR")} XOF
                    </TableCell>
                    <TableCell>
                      <Badge>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                       <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Voir les {order.items.length} article(s)</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {order.items.map(item => (
                                  <li key={item.id}>
                                    {item.quantity}x {item.name} ({(item.price * item.quantity).toLocaleString("fr-FR")} XOF)
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        Aucune commande pour le moment.
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
