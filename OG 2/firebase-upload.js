// // firebase-upload.js
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { app } from "./firebase-init.js"; // Make sure firebase-init.js exports your Firebase app

// const storage = getStorage(app);

// /**
//  * Uploads a PDF file to Firebase Storage and returns its public URL.
//  * @param {File} file - The PDF file to upload.
//  * @returns {Promise<string>} - The download URL.
//  */
// export async function uploadPDFAndGetURL(file) {
//   if (!file || file.type !== 'application/pdf') {
//     throw new Error("Invalid file. Please upload a valid PDF.");
//   }

//   const uniqueFileName = `pdfs/${Date.now()}_${file.name}`;
//   const fileRef = ref(storage, uniqueFileName);

//   await uploadBytes(fileRef, file);
//   const downloadURL = await getDownloadURL(fileRef);

//   return downloadURL;
// }

// firebase-upload.js
// firebase-upload.js
// ------------------------
// import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';
// import { storage } from './firebase-init.js';

// export async function uploadPDFAndGetURL(file) {
//   const storageRef = ref(storage, `pdfs/${Date.now()}_${file.name}`);
//   const snapshot = await uploadBytes(storageRef, file);
//   const downloadURL = await getDownloadURL(snapshot.ref);
//   return downloadURL;
// }
//---------------------//

// firebase-upload.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFaCzo4YMhFayvDukuIY_nmjml_HpfJm0",
  authDomain: "book-library-3fcba.firebaseapp.com",
  projectId: "book-library-3fcba",
  storageBucket: "book-library-3fcba.firebasestorage.app",
  messagingSenderId: "67300545709",
  appId: "1:67300545709:web:697c0a9aad7a390706a224",
  measurementId: "G-QMDSVGF76G"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadPDFAndGetURL(file) {
  const timestamp = Date.now();
  const fileRef = ref(storage, `pdfs/${timestamp}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}
