// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAqt6nkZ1PnL8gB9f7S3nhBN_nM2meP7A",
  authDomain: "mess-87aff.firebaseapp.com",
  projectId: "mess-87aff",
  databaseURL: "https://mess-87aff.firebaseio.com",
  storageBucket: "mess-87aff.appspot.com",
  messagingSenderId: "830196629651",
  appId: "1:830196629651:web:26e0e69c5b1bb2a69f0d66",
  measurementId: "G-G5B96PSDJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, db, storage};