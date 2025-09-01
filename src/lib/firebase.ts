import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ID du projet Firebase: vitraf-alu-45091
const firebaseConfig = {
  "projectId": "vitraf-alu-showcase",
  "appId": "1:730672748538:web:2bac7faed72178a117b643",
  "storageBucket": "vitraf-alu-showcase.firebasestorage.app",
  "apiKey": "AIzaSyCIAgmG9XpET-fG0ou33lB6ox__YjZ-_V4",
  "authDomain": "vitraf-alu-showcase.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "730672748538"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
