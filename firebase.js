// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  API_KEY,
  API_DOMAIN,
  API_PROJECT_ID,
  API_BUCKET,
  API_SENDER_ID,
  API_ID,
  API_MEASUREMENT_ID,
} from '@env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: API_DOMAIN,
  projectId: API_PROJECT_ID,
  storageBucket: API_BUCKET,
  messagingSenderId: API_SENDER_ID,
  appId: API_ID,
  measurementId: API_MEASUREMENT_ID,
};

// console.log(process.env.REACT_APP_FIREBASE_KEY);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
