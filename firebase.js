import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCyFbK6PDBpBPGm11dEdXKLNL_EmMUVBhg",
    authDomain: "arprojesi-7cc59.firebaseapp.com",
    projectId: "arprojesi-7cc59",
    storageBucket: "arprojesi-7cc59.firebasestorage.app",
    messagingSenderId: "336129837337",
    appId: "1:336129837337:web:b99ae27da5f2550e185d88",
    measurementId: "G-B3G2MP5FMD"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Export edilen objeler
export { auth, analytics };

