
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, orderBy, limit, onSnapshot } from "firebase/firestore";

// CONFIGURACIÓN DE OPERACIONES EN LA NUBE
const firebaseConfig = {
  apiKey: "AIzaSy_GHOST_REAL_KEY_MOCK",
  authDomain: "ar-control-ghost.firebaseapp.com",
  projectId: "ar-control-ghost",
  storageBucket: "ar-control-ghost.appspot.com",
  messagingSenderId: "987654321",
  appId: "1:987654321:web:gh0st"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const syncOperatorState = async (userId: string, data: any) => {
  try {
    const docRef = doc(db, "operators", userId);
    await setDoc(docRef, { 
      ...data, 
      lastUpdate: new Date().toISOString(),
      status: "OPERATIONAL"
    }, { merge: true });
  } catch (e) {
    console.error("Firebase_Sync_Error:", e);
  }
};

export const logOperation = async (userId: string, toolId: string, output: string) => {
    try {
        const opsRef = collection(db, "operators", userId, "operations");
        await addDoc(opsRef, {
            toolId,
            timestamp: new Date().toISOString(),
            log: output.slice(0, 500) // Guardar fragmento para análisis
        });
    } catch (e) {
        console.error("Firebase_Log_Error:", e);
    }
}

export const getOperatorState = async (userId: string) => {
  const docRef = doc(db, "operators", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
