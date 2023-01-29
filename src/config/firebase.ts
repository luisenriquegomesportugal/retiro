import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCY4W8kF23z-azgqLhuSC3rt91OkTWITbw",
  authDomain: "retiro-cdd86.firebaseapp.com",
  databaseURL: "https://retiro-cdd86-default-rtdb.firebaseio.com",
  projectId: "retiro-cdd86",
  storageBucket: "retiro-cdd86.appspot.com",
  messagingSenderId: "342629120938",
  appId: "1:342629120938:web:d047730b54f9c0e12749d3"
  };
  
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
  export const database = getDatabase(app);