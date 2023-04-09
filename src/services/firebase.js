// Import the required Firebase modules
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

// Firebase configuration object
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

// Get a Firestore instance
export const db = getFirestore(app);

// Function to get all products from the Products collection
export const getAllProducts = async () => {
  const productsRef = collection(db, 'Products');
  const productsSnapshot = await getDocs(productsRef);
  return productsSnapshot.docs.map((doc) => ({ ...doc.data() }));
};

// Function to get products from the Products collection by category
export const getProductsByCategory = async (category) => {
  const productsRef = collection(db, 'Products');
  const q = query(productsRef, where('category', '==', category));
  const productsSnapshot = await getDocs(q);

  return productsSnapshot.docs.map((doc) => ({ ...doc.data() }));
};

// Function to get a specific product from the Products collection by ID
export const getProductById = async (productId) => {
  const productsRef = collection(db, 'Products');
  const q = query(productsRef, where('id', '==', Number(productId)));
  const productsSnapshot = await getDocs(q);
  console.log('getProductById', productsRef, q, productsSnapshot.size);

  if (productsSnapshot.size === 0) {
    throw new Error(`Product with ID ${productId} does not exist.`);
  }

  const productData = productsSnapshot.docs[0].data();
  return { ...productData };
};

// Function to get all wishlist items for the current user
export const getAllWishlistItems = async () => {

  // Getting info of authenticated user
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    console.error("User is not authenticated or email not available.");
    return;
  }

  const email = user.email;

  // Query to find the user in Users collection with the matching email
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

    // Iterate through wishlist items and add them to the wishlistItems array
    wishlistSnapshot.docs.forEach((wishlistItem) => {
      wishlistItems.push({
        ...wishlistItem.data()
      });
    });
  }

  return wishlistItems;
};

// Function to add a product to the user's wishlist
export const addProductToWishlist = async (productId) => {

  // Getting info of authenticated user
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

    // Adding new user to Users collection - if one doesn't exist
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
  
  // Checking if product already exist in user's wishlist
  const wishlistRef = collection(db, 'Users', userDoc.id, 'Wishlist');
  const wishlistItemQuery = query(wishlistRef, where('id', '==', Number(productId)));
  const wishlistItemSnapshot = await getDocs(wishlistItemQuery);

  if (!wishlistItemSnapshot.empty) {
    console.log("Product already exists in the wishlist.");
    return;
  }

  const wishlistItemRef = doc(db, 'Users', userDoc.id, 'Wishlist', productId);

  // Adding product data to user's wishlist
  try {
    await setDoc(wishlistItemRef, productData);
    console.log("Product added to wishlist successfully.");
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
  }
};

// Function to remove a product from the user's wishlist
export const removeProductFromWishlist = async (productId) => {

  // Getting info of authenticated user
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

  // Removing product form user's wishlist
  try {
    await deleteDoc(wishlistItemDoc.ref);
    console.log("Product removed from wishlist successfully.");
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
  }
};

// Export the auth object
export const auth = getAuth(app);

// Export the Firebase app instance as default
export default app;