// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fire = firebase.initializeApp ({
  apiKey: "AIzaSyBnDOBzTWwrasdyHBTR1fgqJcoN2nIw9Ls",
  authDomain: "secret-footing-295702.firebaseapp.com",
  projectId: "secret-footing-295702",
  storageBucket: "secret-footing-295702.appspot.com",
  messagingSenderId: "502068781955",
  appId: "1:502068781955:web:91c077275649683eee0cb6",
  measurementId: "G-NKHZEXF35T",
});

// Initialize Firebase
export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};
// const analytics = getAnalytics(app);