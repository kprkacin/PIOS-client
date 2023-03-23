import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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

export const auth = getAuth(app);
export default app;
