import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where, doc, getDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDeGL9Ba126xbAH9MpHdZ3ulmfWIqogpdo',
  authDomain: 'pios-webshop.firebaseapp.com',
  databaseURL: 'https://pios-webshop-default-rtdb.firebaseio.com',
  projectId: 'pios-webshop',
  storageBucket: 'pios-webshop.appspot.com',
  messagingSenderId: '931839299842',
  appId: '1:931839299842:web:aefa43d254a516295d321b',
  measurementId: 'G-YJGLMF7GZL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getAllProducts = async () => {
  const productsRef = collection(db, 'Products');
  const productsSnapshot = await getDocs(productsRef);
  return productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProductsByCategory = async (category) => {
  const productsRef = collection(db, 'Products');
  const q = query(productsRef, where("category", "==", category))
  const productsSnapshot = await getDocs(q);

  return productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (productId) => {
  const productRef = doc(db, 'Products', productId);
  const productDoc = await getDoc(productRef);

  if (!productDoc.exists()) {
    throw new Error(`Product with ID '${productId}' does not exist.`);
  }

  return { id: productDoc.id, ...productDoc.data() };
};

export const auth = getAuth(app);
export default app;
