// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_z2ZT4ag-M25z7EErRKRnS5FqDZX3xow",
  authDomain: "bancodadosmobile.firebaseapp.com",
  databaseURL: "https://bancodadosmobile-default-rtdb.firebaseio.com",
  projectId: "bancodadosmobile",
  storageBucket: "bancodadosmobile.firebasestorage.app",
  messagingSenderId: "704428907753",
  appId: "1:704428907753:web:8639b3beaf506dbe926478",
  measurementId: "G-XZ6ML9FHB5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//export const db = getFirestore(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});