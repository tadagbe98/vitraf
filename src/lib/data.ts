// This file now contains only placeholder data for initial development.
// The data is now fetched from Firebase Firestore.

export const galleryImages = [
  { id: "1", src: "https://picsum.photos/seed/sliding-window/800/600", alt: "Fenêtre coulissante en aluminium", category: "Fenêtres", description: "Fenêtre coulissante pour une villa moderne et lumineuse.", aiHint: "sliding window" },
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
];

export const shopItems = [
    { id: "1", src: "https://picsum.photos/seed/door-hinge/400/300", name: "Charnière de porte", price: 3500, description: "Charnière robuste en inox pour porte en aluminium.", aiHint: "door hinge" },
];
