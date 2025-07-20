import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDEslMXmqQcd6oy-vUNjDUSYQsT_KVQWf4",
  authDomain: "trykemoto.firebaseapp.com",
  projectId: "trykemoto",
  storageBucket: "trykemoto.appspot.com",
  messagingSenderId: "910888638188",
  appId: "1:910888638188:web:cd23d3ce6a391c612237c9",
  measurementId: "G-XDPPXJ9266"
};

// ✅ Initialize app and auth
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export only what’s needed
export { auth, db, firebaseConfig, storage };
