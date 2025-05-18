// firebase-upload.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebase-init.js"; // Make sure firebase-init.js exports your Firebase app

const storage = getStorage(app);

/**
 * Uploads a PDF file to Firebase Storage and returns its public URL.
 * @param {File} file - The PDF file to upload.
 * @returns {Promise<string>} - The download URL.
 */
export async function uploadPDFAndGetURL(file) {
  if (!file || file.type !== 'application/pdf') {
    throw new Error("Invalid file. Please upload a valid PDF.");
  }

  const uniqueFileName = `pdfs/${Date.now()}_${file.name}`;
  const fileRef = ref(storage, uniqueFileName);

  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
}
