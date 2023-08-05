// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVMYqXtIy0cpCibv9BPkT3fU8lcErf2eA",
  authDomain: "pustaka-digital-3575e.firebaseapp.com",
  databaseURL: "https://pustaka-digital-3575e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pustaka-digital-3575e",
  storageBucket: "pustaka-digital-3575e.appspot.com",
  messagingSenderId: "616121602719",
  appId: "1:616121602719:web:64e2cacc56e171121388aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (!window.PUSTAKA) window.PUSTAKA = {};
if (!window.PUSTAKA.firebase) window.PUSTAKA.firebase = {};

window.PUSTAKA.firebase.app = app;