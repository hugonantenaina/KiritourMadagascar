// src/firebase/firebaseConfig.js
// ─────────────────────────────────────────────────────────────
//  KiriTour Madagascar — Firebase Authentication
//  Project: kiritour (ID: 259469821322)
//  Tsy mila backend — Google + Email/Password FREE
// ─────────────────────────────────────────────────────────────

import { initializeApp }  from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyAJU8dLasdI6FtLImX6rUN71IRPJhxZl_s",
  authDomain:        "kiritour.firebaseapp.com",
  projectId:         "kiritour",
  storageBucket:     "kiritour.firebasestorage.app",
  messagingSenderId: "259469821322",
  appId:             "1:259469821322:web:9176baf75a41212e78b473",
  measurementId:     "G-JGB4NBPLPL",
};

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();

// Force account picker — tsy auto-select account
provider.setCustomParameters({ prompt: "select_account" });

export {
  auth,
  provider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
};