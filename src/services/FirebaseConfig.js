// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZBxe2QDqWhi-T6Chn_pbMIqnuBswgZAI",
  authDomain: "forumpage-cac52.firebaseapp.com",
  projectId: "forumpage-cac52",
  storageBucket: "forumpage-cac52.appspot.com",
  messagingSenderId: "340993211455",
  appId: "1:340993211455:web:4f9bd87f9b55dbd3de8c8a",
  measurementId: "G-1QSF2MYS3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)