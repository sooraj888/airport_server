// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDtL9r1gbI43ZPEdANRqWxhoAqLQ60m9U",
  authDomain: "airport-8c441.firebaseapp.com",
  projectId: "airport-8c441",
  storageBucket: "airport-8c441.appspot.com",
  messagingSenderId: "95623185686",
  appId: "1:95623185686:web:2d16fa37cff2e8cf2f3c37",
  measurementId: "G-Y4T61R0N95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
