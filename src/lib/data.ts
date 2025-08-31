// This file now contains only placeholder data for initial development.
// The data is now fetched from Firebase Firestore.

export const galleryImages = [
  { id: "1", src: "https://picsum.photos/seed/sliding-window/800/600", alt: "Fenêtre coulissante en aluminium", category: "Fenêtres", description: "Fenêtre coulissante pour une villa moderne et lumineuse.", aiHint: "sliding window" },
  { id: "2", src: "https://picsum.photos/seed/glass-facade/800/600", alt: "Façade vitrée moderne", category: "Façades", description: "Façade en verre pour un immeuble de bureaux.", aiHint: "glass facade" },
  { id: "3", src: "https://picsum.photos/seed/aluminium-door/800/600", alt: "Porte d'entrée en aluminium", category: "Portes", description: "Porte d'entrée en aluminium robuste et sécurisée.", aiHint: "aluminium door" },
  { id: "4", src: "https://picsum.photos/seed/modern-building-alu/800/600", alt: "Immeuble avec revêtement aluminium", category: "Façades", description: "Revêtement de façade en aluminium composite.", aiHint: "modern building" },
  { id: "5", src: "https://picsum.photos/seed/office-windows/800/600", alt: "Fenêtres de bureau", category: "Fenêtres", description: "Installation de fenêtres pour des plateaux de bureaux.", aiHint: "office windows" },
  { id: "6", src: "https://picsum.photos/seed/garden-door/800/600", alt: "Baie vitrée sur jardin", category: "Portes", description: "Porte-fenêtre coulissante donnant sur un jardin.", aiHint: "sliding door garden" },
  { id: "7", src: "https://picsum.photos/seed/house-window/800/600", alt: "Fenêtre de résidence", category: "Fenêtres", description: "Fenêtres en aluminium pour une résidence privée.", aiHint: "residential window" },
  { id: "8", src: "https://picsum.photos/seed/shop-front/800/600", alt: "Devanture de magasin vitrée", category: "Façades", description: "Grande baie vitrée pour un espace commercial.", aiHint: "glass storefront" },
];

export const contactMessages = [
    { 
        id: '1', 
        name: 'Kouassi Jean', 
        contact: 'kouassi@email.com', 
        location: 'Riviera Palmeraie', 
        message: 'Bonjour, je souhaiterais un devis pour 5 fenêtres coulissantes et une porte d\'entrée.', 
        date: new Date(Date.now() - 1000 * 60 * 60 * 2) 
    },
    { 
        id: '2', 
        name: 'Amina Traoré', 
        contact: '0708091011', 
        location: 'Cocody Angré', 
        message: 'Demande d\'information pour une façade en verre pour mon nouveau magasin.', 
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) 
    },
];

export const shopItems = [
    { id: "1", src: "https://picsum.photos/seed/door-hinge/400/300", name: "Charnière de porte", price: 3500, description: "Charnière robuste en inox pour porte en aluminium.", aiHint: "door hinge" },
    { id: "2", src: "https://picsum.photos/seed/window-handle/400/300", name: "Poignée de fenêtre", price: 5000, description: "Poignée design et ergonomique pour fenêtre battante.", aiHint: "window handle" },
    { id: "3", src: "https://picsum.photos/seed/door-lock/400/300", name: "Serrure de sécurité", price: 12500, description: "Serrure à 3 points pour porte d'entrée principale.", aiHint: "security lock" },
    { id: "4", src: "https://picsum.photos/seed/rubber-seal/400/300", name: "Joint d'étanchéité", price: 1500, description: "Joint en caoutchouc pour une isolation parfaite (vendu au mètre).", aiHint: "rubber seal" },
];
