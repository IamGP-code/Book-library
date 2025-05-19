// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "your-app.firebaseapp.com",
//   projectId: "your-app",
//   storageBucket: "your-app.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// export { storage };


// firebase-init.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFaCzo4YMhFayvDukuIY_nmjml_HpfJm0",
  authDomain: "book-library-3fcba.firebaseapp.com",
  projectId: "book-library-3fcba",
  storageBucket: "book-library-3fcba.firebasestorage.app",
  messagingSenderId: "67300545709",
  appId: "1:67300545709:web:697c0a9aad7a390706a224",
  measurementId: "G-QMDSVGF76G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };