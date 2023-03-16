import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeGL9Ba126xbAH9MpHdZ3ulmfWIqogpdo",
  authDomain: "pios-webshop.firebaseapp.com",
  databaseURL: "https://pios-webshop-default-rtdb.firebaseio.com",
  projectId: "pios-webshop",
  storageBucket: "pios-webshop.appspot.com",
  messagingSenderId: "931839299842",
  appId: "1:931839299842:web:aefa43d254a516295d321b",
  measurementId: "G-YJGLMF7GZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;