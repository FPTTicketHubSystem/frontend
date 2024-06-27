// import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';

// // Config Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyChF7yp-2ZGCzheMxT0LxvXXJ10EnOlFk0",
//   authDomain: "fpttickethub.firebaseapp.com",
//   projectId: "fpttickethub",
//   storageBucket: "fpttickethub.appspot.com",
//   messagingSenderId: "732153710958",
//   appId: "1:732153710958:web:56d129fe6e9cbfb564197f"
// };

// // Firebase initial
// const app = initializeApp(firebaseConfig);

// // Initial Firebase Storage
// const storage = getStorage(app);

// export { storage };
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCzxcVvFtyJhDyrso6v76HrYIL7esmm6mo",
  authDomain: "zotsystem.firebaseapp.com",
  projectId: "zotsystem",
  storageBucket: "zotsystem.appspot.com",
  messagingSenderId: "958097250992",
  appId: "1:958097250992:web:e0329e1b5909b9f9cc3975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
