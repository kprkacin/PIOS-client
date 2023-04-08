import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  setDoc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

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
  return productsSnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
};

export const getProductsByCategory = async (category) => {
  const productsRef = collection(db, 'Products');
  const q = query(productsRef, where('category', '==', category));
  const productsSnapshot = await getDocs(q);

  return productsSnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
};

export const getProductById = async (productId) => {
  const productsRef = collection(db, 'Products');
  const q = query(productsRef, where('id', '==', Number(productId)));
  const productsSnapshot = await getDocs(q);
  console.log('getProductById', productsRef, q, productsSnapshot.size);

  if (productsSnapshot.size === 0) {
    throw new Error(`Product with ID ${productId} does not exist.`);
  }

  const productData = productsSnapshot.docs[0].data();
  return { docId: productsSnapshot.docs[0].id, ...productData };
};

export const getAllWishlistItems = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    console.error("User is not authenticated or email not available.");
    return;
  }

  const email = user.email;

  const usersRef = collection(db, 'Users');
  const q = query(usersRef, where('email', '==', email));
  const userSnapshot = await getDocs(q);

  if (userSnapshot.empty) {
    console.error("No user found with this email.");
    return;
  }

  const wishlistItems = [];

  for (const userDoc of userSnapshot.docs) {
    const wishlistRef = collection(db, 'Users', userDoc.id, 'Wishlist');
    const wishlistSnapshot = await getDocs(wishlistRef);

    wishlistSnapshot.docs.forEach((wishlistItem) => {
      wishlistItems.push({
        docId: wishlistItem.id,
        ...wishlistItem.data()
      });
    });
  }

  return wishlistItems;
};

export const addProductToWishlist = async (productId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    console.error("User is not authenticated or email not available.");
    return;
  }

  const email = user.email;

  if (!productId) {
    console.error("Product ID not provided.");
    return;
  }

  // Query Products collection for the specified product ID
  const productsRef = collection(db, 'Products');
  const productQuery = query(productsRef, where('id', '==', Number(productId)));
  const productSnapshot = await getDocs(productQuery);

  if (productSnapshot.empty) {
    console.error("No product found with this ID.");
    return;
  }

  const productData = productSnapshot.docs[0].data();

  // Query Users collection for the specified email
  const usersRef = collection(db, 'Users');
  const userQuery = query(usersRef, where('email', '==', email));
  const userSnapshot = await getDocs(userQuery);

  let userDoc;

  if (userSnapshot.empty) {
    console.log("No user found with this email. Creating a new user...");

    // Create a new user with the specified email
    try {
      userDoc = await addDoc(usersRef, { email });
      console.log("New user created successfully.");
    } catch (error) {
      console.error("Error creating new user:", error);
      return;
    }
  } else {
    userDoc = userSnapshot.docs[0];
  }

  const wishlistItemRef = doc(db, 'Users', userDoc.id, 'Wishlist', productId);

  try {
    await setDoc(wishlistItemRef, productData);
    console.log("Product added to wishlist successfully.");
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
  }
};

export const removeProductFromWishlist = async (productId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    console.error("User is not authenticated or email not available.");
    return;
  }

  const email = user.email;

  if (!productId) {
    console.error("Product ID not provided.");
    return;
  }

  // Query Users collection for the specified email
  const usersRef = collection(db, 'Users');
  const userQuery = query(usersRef, where('email', '==', email));
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    console.error("No user found with this email.");
    return;
  }

  const userDoc = userSnapshot.docs[0];

  // Query the Wishlist subcollection for the specified product ID
  const wishlistRef = collection(db, 'Users', userDoc.id, 'Wishlist');
  const wishlistQuery = query(wishlistRef, where('id', '==', Number(productId)));
  const wishlistSnapshot = await getDocs(wishlistQuery);

  if (wishlistSnapshot.empty) {
    console.error("No wishlist item found with this product ID.");
    return;
  }

  const wishlistItemDoc = wishlistSnapshot.docs[0];

  try {
    await deleteDoc(wishlistItemDoc.ref);
    console.log("Product removed from wishlist successfully.");
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
  }
};

export const auth = getAuth(app);
export default app;