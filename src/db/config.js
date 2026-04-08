import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD8i_S2SxGi41Ynbo34y6ViG1qQ5GWagTo",
  authDomain: "hazlo-posible-ca7b5.firebaseapp.com",
  projectId: "hazlo-posible-ca7b5",
  storageBucket: "hazlo-posible-ca7b5.firebasestorage.app",
  messagingSenderId: "966797794158",
  appId: "1:966797794158:web:f13d9b22a3b68235517f7f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);