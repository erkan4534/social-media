// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUTueW-gKR14WG0z51YOAB7wSDAwt4uzo",
  authDomain: "social-media-4d4ce.firebaseapp.com",
  projectId: "social-media-4d4ce",
  storageBucket: "social-media-4d4ce.appspot.com",
  messagingSenderId: "911141474689",
  appId: "1:911141474689:web:2e782c7ed81496000ad880",
  measurementId: "G-96RWC8SQ3T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
