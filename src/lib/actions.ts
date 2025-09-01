
"use server";

import * as z from "zod";
import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import type { CartItem } from "@/hooks/use-cart";


// Schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  contact: z.string().min(8, { message: "Le contact doit être valide." }),
  location: z.string().min(3, { message: "La localisation est requise." }),
  work: z.string().min(10, { message: "Veuillez décrire les travaux souhaités (10 caractères min)." }),
});

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Données invalides." };
  }

  try {
    await addDoc(collection(db, "contactMessages"), {
      ...parsed.data,
      date: serverTimestamp(),
    });
    return { success: true, message: "Formulaire soumis avec succès !" };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, message: "Une erreur est survenue." };
  }
}

// Schemas for gallery and shop items
const galleryItemSchema = z.object({
  id: z.string().optional(),
  src: z.string().url({ message: "Veuillez fournir une URL d'image valide." }).or(z.string().startsWith("data:image")),
  alt: z.string().min(3, "Le titre est requis."),
  category: z.string().min(2, "La catégorie est requise."),
  description: z.string().min(5, "La description est requise."),
  aiHint: z.string().optional(),
});

const shopItemSchema = z.object({
    id: z.string().optional(),
    src: z.string().url({ message: "Veuillez fournir une URL d'image valide." }).or(z.string().startsWith("data:image")),
    name: z.string().min(3, "Le nom est requis."),
    price: z.coerce.number().positive("Le prix doit être un nombre positif."),
    description: z.string().min(5, "La description est requise."),
    aiHint: z.string().optional(),
});

const shopItemUpdateSchema = shopItemSchema.extend({
  id: z.string(), // ID is required for updates
});


// Functions to add/update items
export async function addGalleryItem(values: z.infer<typeof galleryItemSchema>) {
    const parsed = galleryItemSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, errors: parsed.error.format() };
    }
    await addDoc(collection(db, "galleryImages"), parsed.data);
    return { success: true };
}

export async function addShopItem(values: z.infer<typeof shopItemSchema>) {
    const parsed = shopItemSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, errors: parsed.error.format() };
    }
    await addDoc(collection(db, "shopItems"), parsed.data);
    return { success: true };
}

export async function updateShopItem(values: z.infer<typeof shopItemUpdateSchema>) {
    const parsed = shopItemUpdateSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, errors: parsed.error.format() };
    }
    const { id, ...itemData } = parsed.data;
    if (!id) {
        return { success: false, message: "L'ID de l'article est manquant." };
    }
    const itemRef = doc(db, "shopItems", id);
    await updateDoc(itemRef, itemData);
    return { success: true };
}

// Functions to delete items
export async function deleteGalleryItem(id: string) {
    await deleteDoc(doc(db, "galleryImages", id));
    return { success: true };
}

export async function deleteShopItem(id: string) {
    await deleteDoc(doc(db, "shopItems", id));
    return { success: true };
}


// Functions to get all items
export async function getGalleryImages() {
  const q = query(collection(db, "galleryImages"), orderBy("alt"));
  const querySnapshot = await getDocs(q);
  const images = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return images;
}

export async function getShopItems() {
  const q = query(collection(db, "shopItems"), orderBy("name"));
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return items;
}

export async function getContactMessages() {
  const q = query(collection(db, "contactMessages"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const messages = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: data.date.toDate(), 
    };
  });
  return messages;
}

// Schema for Order
const orderSchema = z.object({
  customerName: z.string().min(2, "Le nom est requis."),
  customerPhone: z.string().min(8, "Le numéro de téléphone est requis."),
  customerAddress: z.string().min(5, "L'adresse est requise."),
  items: z.array(z.any()), // We'll trust the cartItems structure from the client
  total: z.number(),
});

export async function submitOrder(values: z.infer<typeof orderSchema>) {
  const parsed = orderSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.format() };
  }

  try {
    await addDoc(collection(db, "orders"), {
      ...parsed.data,
      date: serverTimestamp(),
      status: "Nouvelle",
    });
    return { success: true, message: "Commande passée avec succès !" };
  } catch (error) {
    console.error("Error submitting order: ", error);
    return { success: false, message: "Une erreur est survenue lors de la commande." };
  }
}

export async function getOrders() {
  const q = query(collection(db, "orders"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const orders = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: data.date.toDate(),
    };
  });
  return orders;
}
